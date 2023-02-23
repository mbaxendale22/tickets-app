import type { NewTicket } from '../api/Tickets/types'

export enum UserActionTypes {
    START_USER_REQUEST = 'START_USER_REQUEST',
    SET_USER_ERROR = 'SET_USER_ERROR',
    CLEAR_USER_ERROR = 'CLEAR_USER_ERROR',
    END_USER_REQUEST = 'END_USER_REQUEST',
    SET_USER = 'SET_USER',
    RESET_USER = 'RESET_USER',
}

export interface UserObject {
    id: number | null
    createdAt: string
    updatedAt: string
    email: string
    firstName?: string
    lastName?: string
    tickets: number[]
}

export enum APIStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface UserState {
    userData: UserObject
    apiStatus: APIStatus
    login: (email: string, password: string) => void
    logout: () => void
    signup: () => void
    getCurrentUser: () => void
}
////// ------TICKET TYPES--------- //////
export enum TicketActionTypes {
    START_TICKET_REQUEST = 'START_TICKET_REQUEST',
    SET_TICKET_ERROR = 'SET_TICKET_ERROR',
    CLEAR_TICKET_ERROR = 'CLEAR_TICKET_ERROR',
    END_TICKET_REQUEST = 'END_TICKET_REQUEST',
    SET_TICKETS = 'SET_TICKETS',
    ADD_TICKET = 'ADD_TICKET',
    REMOVE_TICKET = 'REMOVE_TICKET',
    RESET_TICKETS = 'RESET_TICKETS',
}

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

export interface TicketState {
    tickets: Ticket[]
    apiStatus: APIStatus
    getTickets: () => void
    createTicket: (ticket: NewTicket) => void
    updateTicket: (id: number) => void
    deleteTicket: (id: number) => void
}

export interface ApplicationState {
    navstate: string
    isInEditMode: boolean
    setNavstate: (id: string) => void
    setIsInEditMode: (editMode: boolean) => void
}

export enum ApplicationActionTypes {
    SET_NAVSTATE = 'SET_NAVSTATE',
    SET_EDITMODE = 'SET_EDITMODE',
}
