import { setupWorker } from 'msw/browser'
import { handlers } from './handlers.js'
import { handlerGraphQL } from './graphql.js'

export const worker = setupWorker(...handlers, handlerGraphQL)