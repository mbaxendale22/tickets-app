// eslint-disable-next-line import/default
import React, { createContext, useContext, useReducer } from 'react'

import { createNewTicket, getTickets } from '../api/Tickets'
import type { NewTicket } from '../api/Tickets/types'

import type { TicketState } from './contextTypes'
import { APIStatus, TicketActionTypes } from './contextTypes'

export const initialState: TicketState = {
    tickets: [],
    apiStatus: APIStatus.IDLE,
    // these act as thunks, to dispatch the actions in correct order
    getTickets: async () => 'no-op',
    createTicket: async (ticket: NewTicket) => console.log(ticket),
    updateTicket: async () => 'no-op',
    deleteTicket: async () => 'no-op',
}

const TicketContext = createContext(initialState)

//TODO fix this any action type
function ticketReducer(
    state: TicketState,
    action: { type: TicketActionTypes; payload?: any },
) {
    switch (action.type) {
        case TicketActionTypes.START_TICKET_REQUEST:
            return { ...state, apiStatus: APIStatus.LOADING }
        case TicketActionTypes.END_TICKET_REQUEST:
            return { ...state, apiStatus: APIStatus.SUCCESS }
        case TicketActionTypes.SET_TICKET_ERROR:
            return { ...state, apiStatus: APIStatus.ERROR }
        case TicketActionTypes.SET_TICKETS:
            return {
                ...state,
                tickets: [...action.payload],
            }
        case TicketActionTypes.ADD_TICKET:
            return {
                ...state,
                tickets: [...state.tickets, action.payload],
            }
        case TicketActionTypes.RESET_TICKETS:
            return {
                ...state,
                ...initialState,
            }

        default:
            return state
    }
}

interface Props {
    children: React.ReactNode
}

export const TicketContextProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(ticketReducer, initialState)
    const value = {
        tickets: state.tickets,
        apiStatus: state.apiStatus,
        getTickets: async () => {
            dispatch({ type: TicketActionTypes.START_TICKET_REQUEST })
            try {
                const tickets = await getTickets()
                dispatch({
                    type: TicketActionTypes.SET_TICKETS,
                    payload: tickets,
                })
            } catch (error) {
                dispatch({ type: TicketActionTypes.SET_TICKET_ERROR })
            } finally {
                dispatch({ type: TicketActionTypes.END_TICKET_REQUEST })
            }
        },
        createTicket: async (ticket: NewTicket) => {
            console.log('*******')
            dispatch({ type: TicketActionTypes.START_TICKET_REQUEST })
            try {
                // make the api call
                await createNewTicket(ticket)
                // add to STATE for optimistic UI update
                dispatch({
                    type: TicketActionTypes.ADD_TICKET,
                    payload: ticket,
                })
            } catch (error) {
                dispatch({ type: TicketActionTypes.SET_TICKET_ERROR })
            } finally {
                dispatch({ type: TicketActionTypes.END_TICKET_REQUEST })
            }
        },
    }

    return (
        <TicketContext.Provider value={value}>
            {children}
        </TicketContext.Provider>
    )
}

export const useTicketContext = () => useContext(TicketContext)
