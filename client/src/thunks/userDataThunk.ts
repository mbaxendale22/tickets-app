// use this thunk to get all necessary start-up state data, when user is returning already logged in

import { getUser } from '../api/user'
import {
    endUserRequest,
    setUser,
    setUserError,
    startUserRequest,
    UserAccessTokenSelector,
} from '../redux/userSlice'
import type { AppThunk } from '../types/redux'

import { setInitialTickets } from './setInitialTickets'

export const userDataThunk = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(startUserRequest())

        const access_token = UserAccessTokenSelector(getState())

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
