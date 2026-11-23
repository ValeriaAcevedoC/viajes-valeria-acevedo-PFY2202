import { Link } from 'react-router'
import { useDestinos } from '../hooks/useDestinos.js'

export default function Destinos() {
  const { destinos, cargando, error, reintentar } = useDestinos()

  return (
    <section>
      <h1>Destinos de viaje</h1>

      <button type="button" onClick={reintentar} disabled={cargando}>
        {error ? 'Reintentar' : 'Actualizar destinos'}
      </button>

      {cargando && (
        <p role="status">
          {destinos === null ? 'Cargando destinos…' : 'Actualizando destinos…'}
        </p>
      )}

      {error && <p role="alert">{error}</p>}

      {!cargando && !error && destinos?.length === 0 && (
        <p>No hay destinos disponibles.</p>
      )}

      {destinos?.map((destino) => (
        <article key={destino.id}>
          <h2>{destino.nombre}</h2>
          <p>{destino.pais}</p>
          <h3>Actividades</h3>

          <ul>
            {destino.actividades.map((actividad) => (
              <li key={actividad}>{actividad}</li>
            ))}
          </ul>

          <Link to={`/destinos/${destino.id}`}>Ver vuelos y hoteles</Link>
        </article>
      ))}
    </section>
  )
}