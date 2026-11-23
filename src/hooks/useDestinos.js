import { useCallback, useEffect, useRef, useState } from 'react'
import {
  invalidarCacheDestinos,
  obtenerDestinos,
} from '../services/destinosService.js'

export function useDestinos() {
  const [destinos, setDestinos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const peticion = useRef(null)

  const consultar = useCallback(async () => {
    const controlador = new AbortController()
    peticion.current?.abort()
    peticion.current = controlador

    try {
      const datos = await obtenerDestinos(controlador.signal)

      if (!controlador.signal.aborted) {
        setDestinos(datos)
      }
    } catch (error) {
      if (!controlador.signal.aborted) {
        setError(error.message)
      }
    } finally {
      if (!controlador.signal.aborted) {
        setCargando(false)
      }

      if (peticion.current === controlador) {
        peticion.current = null
      }
    }
  }, [])

  useEffect(() => {
    consultar()
    return () => peticion.current?.abort()
  }, [consultar])

  function reintentar() {
    invalidarCacheDestinos()
    setCargando(true)
    setError(null)
    consultar()
  }

  return { destinos, cargando, error, reintentar }
}