// eslint-disable-next-line import/default
import React, { createContext, useContext, useReducer } from 'react'

import type { ApplicationState } from './contextTypes'
import { ApplicationActionTypes } from './contextTypes'

export const initialState: ApplicationState = {
    navstate: '1',
    isInEditMode: false,
    setNavstate: (id: string) => console.log(id),
    setIsInEditMode: (editMode: boolean) => console.log(editMode),
}

const ApplicationContext = createContext(initialState)

function applicationReducer(
    state: ApplicationState,
    action: { type: ApplicationActionTypes; payload?: any },
) {
    switch (action.type) {
        case ApplicationActionTypes.SET_NAVSTATE:
            return {
                ...state,
                navstate: action.payload,
            }
        case ApplicationActionTypes.SET_EDITMODE:
            return {
                ...state,
                isInEditMode: action.payload,
            }
        default:
            return state
    }
}

interface Props {
    children: React.ReactNode
}

export const ApplicationContextProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(applicationReducer, initialState)
    const value = {
        navstate: state.navstate,
        isInEditMode: state.isInEditMode,
        setNavstate: (id: string) => {
            dispatch({ type: ApplicationActionTypes.SET_NAVSTATE, payload: id })
        },
        setIsInEditMode: (editMode: boolean) => {
            dispatch({
                type: ApplicationActionTypes.SET_EDITMODE,
                payload: editMode,
            })
        },
    }

    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    )
}

export const useApplicationContext = () => useContext(ApplicationContext)
