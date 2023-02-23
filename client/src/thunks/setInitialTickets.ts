// thunk for getting the users tickets. Currently in use only within other thunks

import { getTickets } from '../api/Tickets'
import {
    endTicketRequest,
    setTicketError,
    setTickets,
    startTicketRequest,
} from '../redux/ticketSlice'
import type { AppThunk } from '../types/redux'

export const setInitialTickets =
    (access_token: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startTicketRequest())
            // query for ticket data
            const data = await getTickets(access_token)

            if (!data) {
                throw new Error('error fetching tickets')
            }

            // set the initial state with the data
            dispatch(setTickets(data))

            dispatch(endTicketRequest())
        } catch (error) {
            dispatch(setTicketError('error fetching users tickets'))
        }
    }
