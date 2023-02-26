// use this thunk to get all necessary start-up state data, when user is returning already logged in

import { getTicketById } from '../api/Tickets'
import {
    endTicketRequest,
    setTicketError,
    setViewTicket,
    startTicketRequest,
} from '../redux/ticketSlice'
import { UserAccessTokenSelector } from '../redux/userSlice'
import type { AppThunk } from '../types/redux'

export const getTicketByIdThunk =
    (ticketId: number): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(startTicketRequest())

            const access_token = UserAccessTokenSelector(getState())

            // set the initial state with user data
            const ticket = await getTicketById(ticketId, access_token)

            if (!ticket) {
                throw new Error('error fetching single view ticket')
            }
            dispatch(setViewTicket(ticket))

            dispatch(endTicketRequest())
        } catch (error) {
            dispatch(setTicketError('error fetching single view ticket'))
        }
    }
