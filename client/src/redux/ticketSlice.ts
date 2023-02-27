import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import type { NewTicket } from '../api/Tickets/types'
import type { RootState } from '../types/redux'

export interface Ticket {
    id: number | null
    createdAt: string
    updatedAt: string
    userId: number
    title: string
    description?: string
    epic?: string
    learning_outcomes?: string
    reflections?: string
    comfort_level?: number
    link?: string
}

export type TicketState = {
    api: {
        isLoading: boolean
        isError: {
            error: boolean
            message: string
        }
    }
    tickets: Ticket[]
    ticketInFocus: number
    viewTicket: Ticket | null
    sortedTickets: Ticket[]
}

export type UpdateTicketUI = {
    id: number
    newTicket: NewTicket
}

export const initialState: TicketState = {
    api: {
        isLoading: false,
        isError: {
            error: false,
            message: '',
        },
    },
    tickets: [],
    ticketInFocus: 0,
    viewTicket: null,
    sortedTickets: [],
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        startTicketRequest: (state) => {
            state.api.isLoading = true
            state.api.isError.error = false
        },

        setTicketError: (state, action: PayloadAction<string>) => {
            state.api.isError.error = true
            state.api.isLoading = false
            state.api.isError.message = action.payload
        },

        endTicketRequest: (state) => {
            state.api.isLoading = false
            state.api.isError.error = false
        },

        // used to set the initial state with value retrieved from the server
        setTickets: (state, action: PayloadAction<Ticket[]>) => {
            state.tickets = action.payload
        },
        // add a new ticket into state - for optimistic updates
        addTicket: (state, action: PayloadAction<Ticket>) => {
            state.tickets.push(action.payload)
        },
        // remove a ticket from state - for optimistic updates
        removeTicket: (state, action: PayloadAction<number>) => {
            state.tickets = state.tickets.filter(
                (ticket) => ticket.id !== action.payload,
            )
        },

        setTicketInFocus: (state, action: PayloadAction<number>) => {
            state.ticketInFocus = action.payload
        },
        clearTicketInFocus: (state) => {
            state.ticketInFocus = 0
        },
        setSortedTickets: (state, action: PayloadAction<string>) => {
            state.sortedTickets = state.tickets.filter(
                (ticket) => ticket.epic === action.payload,
            )
        },
        clearSortedTickets: (state) => {
            state.sortedTickets = []
        },
        setViewTicket: (state, action: PayloadAction<Ticket>) => {
            state.viewTicket = action.payload
        },
        clearViewTicket: (state) => {
            state.viewTicket = null
        },
    },
})

export const {
    startTicketRequest,
    setTicketError,
    endTicketRequest,
    setTickets,
    addTicket,
    removeTicket,
    setTicketInFocus,
    clearTicketInFocus,
    setSortedTickets,
    clearSortedTickets,
    setViewTicket,
    clearViewTicket,
} = ticketSlice.actions

export default ticketSlice.reducer

export const TicketIsLoadingSelector = ({ tickets }: RootState) =>
    tickets.api.isLoading
export const TicketIsErrorSelector = ({ tickets }: RootState) =>
    tickets.api.isError
export const TicketSelector = ({ tickets }: RootState) => tickets.tickets

export const TicketInFocusSelector = ({ tickets }: RootState) =>
    tickets.ticketInFocus

export const TicketByIdSelector = (id: number) =>
    createSelector(TicketSelector, (tickets) => {
        return tickets.find((ticket) => ticket.id === id)
    })
export const epicSelector = () =>
    createSelector(TicketSelector, (tickets) => {
        const arr = []
        for (const ticket of tickets) {
            if (ticket.epic) {
                arr.push(ticket.epic)
            }
        }
        return arr
    })
export const sortedTicketsSelector = ({ tickets }: RootState) =>
    tickets.sortedTickets

export const viewTicketSelector = ({ tickets }: RootState) => tickets.viewTicket
