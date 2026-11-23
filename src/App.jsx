import { HashRouter, NavLink, Route, Routes } from 'react-router'
import Destinos from './pages/Destinos.jsx'
import DetalleDestino from './pages/DetalleDestino.jsx'

function Inicio() {
  return (
    <>
      <h1>Explora Chile con Rumbo Sur</h1>
      <p>
        Descubre destinos, conoce sus actividades y consulta los vuelos
        y hoteles disponibles para planificar tu viaje.
      </p>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <header>
        <strong>Rumbo Sur</strong>
        <nav aria-label="Navegación principal">
          <ul>
            <li><NavLink to="/" end>Inicio</NavLink></li>
            <li><NavLink to="/destinos">Destinos</NavLink></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/destinos/:id" element={<DetalleDestino />} />
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
      </main>
    </HashRouter>
  )
}