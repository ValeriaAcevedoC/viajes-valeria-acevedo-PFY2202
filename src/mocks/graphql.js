import { buildSchema, graphql as ejecutarGraphQL } from 'graphql'
import { graphql, HttpResponse } from 'msw'

const esquema = buildSchema(`
  type Query {
    opcionesDestino(destinoId: ID!): OpcionesViaje
  }

  type OpcionesViaje {
    vuelos: [Vuelo!]!
    hoteles: [Hotel!]!
  }

  type Vuelo {
    id: ID!
    aerolinea: String!
    ruta: String!
    fecha: String!
    precio: Int!
    disponibilidad: Int!
  }

  type Hotel {
    id: ID!
    nombre: String!
    entrada: String!
    salida: String!
    precio: Int!
    disponibilidad: Int!
  }
`)

const datosPorDestino = new Map([
  ['atacama', {
    ruta: 'Santiago → Calama',
    precioVuelo: 54990,
    hotel: 'Posada del Salar',
    precioHotel: 45900,
  }],
  ['santiago', {
    ruta: 'Concepción → Santiago',
    precioVuelo: 34990,
    hotel: 'Hotel Barrio Parque',
    precioHotel: 59900,
  }],
  ['torres-del-paine', {
    ruta: 'Santiago → Puerto Natales',
    precioVuelo: 109990,
    hotel: 'Hostería del Paine',
    precioHotel: 89900,
  }],
])

function opcionesDestino({ destinoId }) {
  const datos = datosPorDestino.get(destinoId)
  if (!datos) return null

  return {
    vuelos: [{
      id: `vuelo-${destinoId}`,
      aerolinea: 'Aerovía Sur',
      ruta: datos.ruta,
      fecha: '2027-02-10',
      precio: datos.precioVuelo,
      disponibilidad: 6,
    }],
    hoteles: [{
      id: `hotel-${destinoId}`,
      nombre: datos.hotel,
      entrada: '2027-02-10',
      salida: '2027-02-13',
      precio: datos.precioHotel,
      disponibilidad: 3,
    }],
  }
}

const urlGraphQL = new URL('api/graphql', document.baseURI).href

export const handlerGraphQL = graphql.link(urlGraphQL).query(
  'OpcionesDestino',
  async ({ query, variables, operationName }) => {
    const resultado = await ejecutarGraphQL({
      schema: esquema,
      source: query,
      variableValues: variables,
      operationName,
      rootValue: { opcionesDestino },
    })

    return HttpResponse.json(resultado)
  },
)