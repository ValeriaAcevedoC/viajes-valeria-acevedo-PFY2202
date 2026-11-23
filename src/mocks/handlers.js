import { delay, http, HttpResponse } from 'msw'

const destinos = [
  {
    id: 'atacama',
    nombre: 'San Pedro de Atacama',
    pais: 'Chile',
    actividades: ['Valle de la Luna', 'Géiseres del Tatio'],
  },
  {
    id: 'santiago',
    nombre: 'Santiago',
    pais: 'Chile',
    actividades: ['Cerro San Cristóbal', 'Barrio Lastarria'],
  },
  {
    id: 'torres-del-paine',
    nombre: 'Torres del Paine',
    pais: 'Chile',
    actividades: ['Trekking Base Torres', 'Visita al lago Pehoé'],
  },
]

const urlDestinos = new URL('api/destinos', document.baseURI).href
const claveFallo = 'fallarDestinosUnaVez'

export const handlers = [
  http.get(urlDestinos, async () => {
    await delay(700)

    if (sessionStorage.getItem(claveFallo) === 'true') {
      sessionStorage.removeItem(claveFallo)
      return HttpResponse.json(
        { mensaje: 'Error simulado del servidor' },
        { status: 500 },
      )
    }

    return HttpResponse.json(destinos)
  }),
]