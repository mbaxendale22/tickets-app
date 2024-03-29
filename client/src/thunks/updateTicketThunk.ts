// use this thunk to get all necessary start-up state data, when user is returning already logged in

import { updateTicketById } from '../api/Tickets'
import type { NewTicket } from '../api/Tickets/types'
import {
    endTicketRequest,
    setTicketError,
    startTicketRequest,
} from '../redux/ticketSlice'
import { UserAccessTokenSelector } from '../redux/userSlice'
import type { AppThunk } from '../types/redux'

import { setInitialTickets } from './setInitialTickets'

export const updateTicketThunk =
    (ticketId: number, newTicket: NewTicket): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(startTicketRequest())

            const access_token = UserAccessTokenSelector(getState())

            // update the ticket
            await updateTicketById(ticketId, newTicket, access_token)

            // get newly updated tickets
            dispatch(setInitialTickets(access_token))

            dispatch(endTicketRequest())
        } catch (error) {
            dispatch(setTicketError('error updating users tickets'))
        }
    }
