import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import type { RootState } from '../types/redux'

export interface UserData {
    id: number | null
    createdAt: string
    updatedAt: string
    email: string
    firstName?: string
    lastName?: string
    tickets: number[]
}

export type UserState = {
    api: {
        isLoading: boolean
        isError: {
            error: boolean
            message: string
        }
    }
    userData: UserData
    access_token: string
}

export const initialState: UserState = {
    api: {
        isLoading: false,
        isError: {
            error: false,
            message: '',
        },
    },
    userData: {
        id: null,
        createdAt: '',
        updatedAt: '',
        email: '',
        firstName: '',
        lastName: '',
        tickets: [],
    },
    access_token: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startUserRequest: (state) => {
            state.api.isLoading = true
            state.api.isError.error = false
        },
        setUserError: (state, action: PayloadAction<string>) => {
            state.api.isError.error = true
            state.api.isLoading = false
            state.api.isError.message = action.payload
        },
        endUserRequest: (state) => {
            state.api.isLoading = false
            state.api.isError.error = false
        },
        setUser: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload
        },
        resetUser: (state) => {
            state.userData = initialState.userData
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.access_token = action.payload
        },
    },
})

export const {
    startUserRequest,
    setUserError,
    endUserRequest,
    setUser,
    resetUser,
    setAccessToken,
} = userSlice.actions

export default persistReducer(
    {
        key: 'userDataPersist',
        storage,
        whitelist: ['access_token'],
    },

    userSlice.reducer,
)

export const UserIsLoadingSelector = ({ user }: RootState) => user.api.isLoading
export const UserIsErrorSelector = ({ user }: RootState) => user.api.isError
export const UserAccessTokenSelector = ({ user }: RootState) =>
    user.access_token
