import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { worker } from './mocks/browser.js'
import './index.css'

const root = createRoot(document.getElementById('root'))

async function iniciarAplicacion() {
  try {
    await worker.start({
      serviceWorker: {
        url: new URL('mockServiceWorker.js', document.baseURI).href,
      },
      onUnhandledRequest: 'bypass',
    })

    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  } catch (error) {
    console.error(error)
    root.render(<p>No se pudo iniciar la API simulada. Recarga la página.</p>)
  }
}

iniciarAplicacion()