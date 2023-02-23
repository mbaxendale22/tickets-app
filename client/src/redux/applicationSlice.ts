import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../types/redux'

export type ApplicationState = {
    navstate: string
    isInEditMode: boolean
}

export const initialState: ApplicationState = {
    navstate: '1',
    isInEditMode: false,
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
    },
})

export const { setNavState, setIsInEditMode } = applicationSlice.actions

export default applicationSlice.reducer

export const navstateSelector = ({ application }: RootState) =>
    application.navstate
export const isInEditModeSelector = ({ application }: RootState) =>
    application.isInEditMode
