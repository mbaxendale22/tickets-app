// this thunk contains the full login flow, including getting the access token, getting the user data, and getting the users tickets

import { loginUser } from '../api/auth'
import { getUser } from '../api/user'
import {
    endUserRequest,
    setAccessToken,
    setUser,
    setUserError,
    startUserRequest,
} from '../redux/userSlice'
import type { AppThunk } from '../types/redux'

import { setInitialTickets } from './setInitialTickets'

export const loginThunk =
    (email: string, password: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startUserRequest())
            // login for access token
            const access_token = await loginUser(email, password)

            if (!access_token) {
                dispatch(setUserError('error getting access token'))
                throw new Error()
            }

            dispatch(setAccessToken(access_token))

            if (!access_token) {
                dispatch(setUserError('error getting access token'))
                throw new Error()
            }
            const userData = await getUser(access_token)

            if (!userData) {
                setUserError('error getting user data')
                throw new Error()
            }

            // set the initial state with user data
            dispatch(setUser(userData.req))

            // get the users tickets
            dispatch(setInitialTickets(access_token))

            dispatch(endUserRequest())
        } catch (error) {
            dispatch(setUserError('error fetching users tickets'))
        }
    }
