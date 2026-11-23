const consulta = `
  query OpcionesDestino($id: ID!) {
    opcionesDestino(destinoId: $id) {
      vuelos { id aerolinea ruta fecha precio disponibilidad }
      hoteles { id nombre entrada salida precio disponibilidad }
    }
  }
`

export async function obtenerOpcionesViaje(id, signal) {
  const url = new URL('api/graphql', document.baseURI)
  const respuesta = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      operationName: 'OpcionesDestino',
      query: consulta,
      variables: { id },
    }),
    signal,
  })

  if (!respuesta.ok) {
    throw new Error(`No pudimos consultar las opciones de viaje (${respuesta.status}).`)
  }

  const resultado = await respuesta.json()

  if (resultado.errors?.length || !resultado.data) {
    throw new Error('No pudimos consultar la disponibilidad de vuelos y hoteles.')
  }

  return resultado.data.opcionesDestino
}