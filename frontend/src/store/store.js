import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice'
import ticketReducer from './user/ticket-slice'
import agentTicketReducer from './agent/ticket-slice'

const store = configureStore(
  {
    reducer : {
      auth : authReducer,
      ticket : ticketReducer,
      agentTicket : agentTicketReducer
    }
  }
)

export default store