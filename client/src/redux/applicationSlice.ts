import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../types/redux'
import { NavigationKeys } from '../utils/constants'

export type ApplicationState = {
    navstate: string

    ticketSearchBy: string
}

export const initialState: ApplicationState = {
    navstate: NavigationKeys.HOME,
    ticketSearchBy: '',
}

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setNavState: (state, action: PayloadAction<string>) => {
            state.navstate = action.payload
        },
        setTicketSearchBy: (state, action: PayloadAction<string>) => {
            state.ticketSearchBy = action.payload
        },
        clearTicketSearchBy: (state) => {
            state.ticketSearchBy = ''
        },
    },
})

export const { setNavState, setTicketSearchBy, clearTicketSearchBy } =
    applicationSlice.actions

export default applicationSlice.reducer

export const navstateSelector = ({ application }: RootState) =>
    application.navstate

export const ticketSearchBySelector = ({ application }: RootState) =>
    application.ticketSearchBy
