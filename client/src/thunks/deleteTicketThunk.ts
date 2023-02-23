// use this thunk to get all necessary start-up state data, when user is returning already logged in

import { deleteTicketById } from '../api/Tickets'
import {
    clearTicketInFocus,
    endTicketRequest,
    setTicketError,
    startTicketRequest,
} from '../redux/ticketSlice'
import { UserAccessTokenSelector } from '../redux/userSlice'
import type { AppThunk } from '../types/redux'

export const deleteTicketThunk =
    (ticketId: number): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(startTicketRequest())

            const access_token = UserAccessTokenSelector(getState())

            // set the initial state with user data
            deleteTicketById(ticketId, access_token)

            dispatch(clearTicketInFocus())

            dispatch(endTicketRequest())
        } catch (error) {
            dispatch(setTicketError('error fetching users tickets'))
        }
    }
