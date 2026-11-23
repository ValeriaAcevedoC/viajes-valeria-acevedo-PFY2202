function esDestinoValido(destino) {
  return (
    destino !== null &&
    typeof destino === 'object' &&
    typeof destino.id === 'string' &&
    typeof destino.nombre === 'string' &&
    typeof destino.pais === 'string' &&
    Array.isArray(destino.actividades) &&
    destino.actividades.every((actividad) => typeof actividad === 'string')
  )
}

async function consultarDestinos(signal) {
  const url = new URL('api/destinos', document.baseURI)
  const controlador = new AbortController()
  const cancelar = () => controlador.abort()

  if (signal.aborted) cancelar()
  signal.addEventListener('abort', cancelar, { once: true })
  const temporizador = setTimeout(cancelar, 8000)

  try {
    const respuesta = await fetch(url, { signal: controlador.signal })

    if (respuesta.status === 404) {
      throw new Error('No se encontró el servicio de destinos.')
    }

    if (respuesta.status >= 500) {
      throw new Error('El servidor no pudo cargar los destinos. Intenta nuevamente.')
    }

    if (!respuesta.ok) {
      throw new Error(`No se pudieron cargar los destinos (${respuesta.status}).`)
    }

    const datos = await respuesta.json()

    if (!Array.isArray(datos) || !datos.every(esDestinoValido)) {
      throw new SyntaxError()
    }

    return datos
  } catch (error) {
    if (signal.aborted) throw error

    if (controlador.signal.aborted) {
      throw new Error('La consulta tardó demasiado. Intenta nuevamente.')
    }

    if (error instanceof SyntaxError) {
      throw new Error('El servicio devolvió los destinos en un formato incorrecto.')
    }

    if (error instanceof TypeError) {
      throw new Error('No pudimos conectar con el servicio de destinos.')
    }

    throw error
  } finally {
    clearTimeout(temporizador)
    signal.removeEventListener('abort', cancelar)
  }
}

const DURACION_CACHE = 60_000
let cacheDestinos = null
let consultaPendiente = null

export function invalidarCacheDestinos() {
  cacheDestinos = null
  consultaPendiente = null
}

export async function obtenerDestinos(signal) {
  signal.throwIfAborted()

  if (cacheDestinos && Date.now() < cacheDestinos.venceEn) {
    return cacheDestinos.datos
  }

  if (!consultaPendiente || consultaPendiente.controlador.signal.aborted) {
    const controlador = new AbortController()
    const consulta = { controlador, usuarios: 0 }

    consulta.promesa = consultarDestinos(controlador.signal)
      .then((datos) => {
        controlador.signal.throwIfAborted()

        if (consultaPendiente === consulta) {
          cacheDestinos = {
            datos,
            venceEn: Date.now() + DURACION_CACHE,
          }
        }

        return datos
      })
      .finally(() => {
        if (consultaPendiente === consulta) {
          consultaPendiente = null
        }
      })

    consultaPendiente = consulta
  }

  const consulta = consultaPendiente
  consulta.usuarios += 1

  let cancelar
  const cancelacion = new Promise((_, rechazar) => {
    cancelar = () => rechazar(signal.reason)
    signal.addEventListener('abort', cancelar, { once: true })
  })

  try {
    return await Promise.race([consulta.promesa, cancelacion])
  } finally {
    signal.removeEventListener('abort', cancelar)
    consulta.usuarios -= 1

    if (consulta.usuarios === 0) {
      consulta.controlador.abort()
    }
  }
}