import { signUpUser } from '../api/auth'
import {
    endUserRequest,
    setUserError,
    startUserRequest,
} from '../redux/userSlice'
import type { AppThunk } from '../types/redux'

import { loginThunk } from './loginThunk'

export const signUpThunk =
    (email: string, password: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startUserRequest())

            const response = await signUpUser(email, password)

            console.log(response)

            dispatch(loginThunk(email, password))

            dispatch(endUserRequest())
        } catch (error) {
            dispatch(setUserError('error signing user up'))
        }
    }
