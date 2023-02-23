// use this thunk to get all necessary start-up state data, when user is returning already logged in

import { updateTicketById } from '../api/Tickets'
import type { NewTicket } from '../api/Tickets/types'
import { setIsInEditMode } from '../redux/applicationSlice'
import {
    endTicketRequest,
    setTicketError,
    startTicketRequest,
    updateTicket,
} from '../redux/ticketSlice'
import { UserAccessTokenSelector } from '../redux/userSlice'
import type { AppThunk } from '../types/redux'

import { setInitialTickets } from './setInitialTickets'

export const updateTicketThunk =
    (ticketId: number, newTicket: NewTicket): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(startTicketRequest())

            dispatch(updateTicket({ id: ticketId, newTicket }))

            const access_token = UserAccessTokenSelector(getState())

            // set the initial state with user data
            await updateTicketById(ticketId, newTicket, access_token)

            // get newly updated tickets
            dispatch(setInitialTickets(access_token))

            dispatch(endTicketRequest())
        } catch (error) {
            dispatch(setTicketError('error updating users tickets'))
        } finally {
            dispatch(setIsInEditMode(false))
        }
    }
