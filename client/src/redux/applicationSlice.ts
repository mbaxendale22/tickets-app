import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../types/redux'

export type ApplicationState = {
    navstate: string
    isInEditMode: boolean
    ticketSearchBy: string
}

export const initialState: ApplicationState = {
    navstate: '1',
    isInEditMode: false,
    ticketSearchBy: '',
}

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setNavState: (state, action: PayloadAction<string>) => {
            state.navstate = action.payload
        },
        setIsInEditMode: (state, action: PayloadAction<boolean>) => {
            state.isInEditMode = action.payload
        },
        setTicketSearchBy: (state, action: PayloadAction<string>) => {
            state.ticketSearchBy = action.payload
        },
        clearTicketSearchBy: (state) => {
            state.ticketSearchBy = ''
        },
    },
})

export const {
    setNavState,
    setIsInEditMode,
    setTicketSearchBy,
    clearTicketSearchBy,
} = applicationSlice.actions

export default applicationSlice.reducer

export const navstateSelector = ({ application }: RootState) =>
    application.navstate
export const isInEditModeSelector = ({ application }: RootState) =>
    application.isInEditMode
export const ticketSearchBySelector = ({ application }: RootState) =>
    application.ticketSearchBy
