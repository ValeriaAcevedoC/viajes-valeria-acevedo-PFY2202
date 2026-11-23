import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { obtenerOpcionesViaje } from '../services/opcionesViajeService.js'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

const formatoFecha = new Intl.DateTimeFormat('es-CL', {
  dateStyle: 'medium',
  timeZone: 'UTC',
})

function OpcionesViaje({ id }) {
  const [opciones, setOpciones] = useState(undefined)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controlador = new AbortController()

    obtenerOpcionesViaje(id, controlador.signal)
      .then((datos) => {
        if (!controlador.signal.aborted) setOpciones(datos)
      })
      .catch((error) => {
        if (!controlador.signal.aborted) setError(error.message)
      })

    return () => controlador.abort()
  }, [id])

  if (error) return <p role="alert">{error}</p>
  if (opciones === undefined) return <p role="status">Cargando opciones de viaje…</p>
  if (opciones === null) return <p>No encontramos ese destino.</p>

  return (
    <>
      <section>
        <h2>Vuelos</h2>
        {opciones.vuelos.length === 0 && <p>No hay vuelos para este destino.</p>}

        {opciones.vuelos.map((vuelo) => (
          <article key={vuelo.id}>
            <h3>{vuelo.aerolinea}</h3>
            <p>{vuelo.ruta}</p>
            <p>Fecha: {formatoFecha.format(new Date(vuelo.fecha))}</p>
            <p>Precio por persona: {formatoPrecio.format(vuelo.precio)} CLP</p>
            <p>{vuelo.disponibilidad > 0 ? `${vuelo.disponibilidad} asientos disponibles` : 'Sin asientos disponibles'}</p>
          </article>
        ))}
      </section>

      <section>
        <h2>Hoteles</h2>
        {opciones.hoteles.length === 0 && <p>No hay hoteles para este destino.</p>}

        {opciones.hoteles.map((hotel) => (
          <article key={hotel.id}>
            <h3>{hotel.nombre}</h3>
            <p>Entrada: {formatoFecha.format(new Date(hotel.entrada))}</p>
            <p>Salida: {formatoFecha.format(new Date(hotel.salida))}</p>
            <p>Precio por noche: {formatoPrecio.format(hotel.precio)} CLP</p>
            <p>{hotel.disponibilidad > 0 ? `${hotel.disponibilidad} habitaciones disponibles` : 'Sin habitaciones disponibles'}</p>
          </article>
        ))}
      </section>
    </>
  )
}

export default function DetalleDestino() {
  const { id } = useParams()

  return (
    <section className="detalle-destino">
      <Link to="/destinos">Volver a destinos</Link>
      <h1>Vuelos y hoteles</h1>
      <OpcionesViaje key={id} id={id} />
    </section>
  )
}