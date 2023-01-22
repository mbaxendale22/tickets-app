import React, { createContext, useReducer, Dispatch, ReactNode } from 'react'
import { ActionTypes, APIStatus, UserAction, UserState } from './contextTypes'

export const userState: UserState = {
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
}

const UserContext = createContext<{
    state: UserState
    dispatch: Dispatch<any>
}>({
    state: userState,
    dispatch: () => null,
})

//TODO fix this any action type
function userReducer(state: UserState, action: UserAction) {
    switch (action.type) {
        case ActionTypes.START_USER_REQUEST:
            return { ...state, apiStatus: APIStatus.LOADING }
        case ActionTypes.END_USER_REQUEST:
            return { ...state, apiStatus: APIStatus.SUCCESS }
        case ActionTypes.SET_USER_ERROR:
            return { ...state, apiStatus: APIStatus.ERROR }
        case ActionTypes.SET_USER:
            return {
                ...state,
                id: action.payload.id,
                createdAt: action.payload.createdAt,
                updatedAt: action.payload.updatedAt,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                tickets: action.payload.tickets,
            }

        default:
            return state
    }
}

interface Props {
    children: React.ReactNode
}
const UserProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, userState)

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
