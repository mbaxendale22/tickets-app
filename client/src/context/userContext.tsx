// eslint-disable-next-line import/default
import React, { createContext, useContext, useReducer } from 'react'

import { loginUser } from '../api/auth'
import { getUser } from '../api/user'

import type { UserState } from './contextTypes'
import { APIStatus, UserActionTypes } from './contextTypes'

export const initialState: UserState = {
    userData: {
        id: null,
        createdAt: '',
        updatedAt: '',
        email: '',
        firstName: '',
        lastName: '',
        tickets: [],
    },
    apiStatus: APIStatus.IDLE,
    // these act as thunks, to dispatch the actions in correct order
    login: async (email: string, password: string) =>
        console.log(email, password),
    logout: async () => 'no-op',
    //TODO SIGN UP
    signup: async () => 'no-op',
    getCurrentUser: async () => 'no-op',
}

const UserContext = createContext(initialState)

//TODO fix this any action type
function userReducer(
    state: UserState,
    action: { type: UserActionTypes; payload?: any },
) {
    switch (action.type) {
        case UserActionTypes.START_USER_REQUEST:
            return { ...state, apiStatus: APIStatus.LOADING }
        case UserActionTypes.END_USER_REQUEST:
            return { ...state, apiStatus: APIStatus.SUCCESS }
        case UserActionTypes.SET_USER_ERROR:
            return { ...state, apiStatus: APIStatus.ERROR }
        case UserActionTypes.SET_USER:
            return {
                ...state,
                userData: { ...action.payload },
            }
        case UserActionTypes.RESET_USER:
            return {
                ...state,
                ...initialState,
            }

        default:
            return state
    }
}

interface Props {
    children: React.ReactNode
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)
    const value = {
        userData: {
            id: state.userData.id,
            createdAt: state.userData.createdAt,
            updatedAt: state.userData.updatedAt,
            email: state.userData.email,
            firstName: state.userData.firstName,
            lastName: state.userData.lastName,
            tickets: state.userData.tickets,
        },
        apiStatus: state.apiStatus,

        login: async (email: string, password: string) => {
            console.log('login called', email)
            dispatch({ type: UserActionTypes.START_USER_REQUEST })
            try {
                await loginUser(email, password)
                dispatch({ type: UserActionTypes.END_USER_REQUEST })
            } catch (error) {
                dispatch({ type: UserActionTypes.SET_USER_ERROR })
            }
        },
        logout: () => {
            window.localStorage.removeItem('token')
            dispatch({ type: UserActionTypes.RESET_USER })
        },
        signup: async () => {},
        getCurrentUser: async () => {
            dispatch({ type: UserActionTypes.START_USER_REQUEST })
            try {
                const user = await getUser()
                dispatch({ type: UserActionTypes.SET_USER, payload: user?.req })
                dispatch({ type: UserActionTypes.END_USER_REQUEST })
            } catch (error) {
                dispatch({ type: UserActionTypes.SET_USER_ERROR })
            }
        },
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
