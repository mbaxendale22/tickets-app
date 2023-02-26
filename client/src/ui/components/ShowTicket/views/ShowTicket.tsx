import * as React from 'react'
import { useParams } from 'react-router-dom'

import {
    isInEditModeSelector,
    setIsInEditMode,
} from '../../../../redux/applicationSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { TicketIsLoadingSelector } from '../../../../redux/ticketSlice'
import { getTicketByIdThunk } from '../../../../thunks/getTicketByIdThunk'
import { Nav } from '../../Nav'

import { DisplayTicket } from './DisplayTicket'
import { EditTicket } from './EditTicket'

//TODO DisplayTicket is working n refresh but edit ticket OU is broken now.

export const ShowTicket = () => {
    const dispatch = useAppDispatch()
    const params = useParams()

    const isInEditMode = useAppSelector(isInEditModeSelector)
    const isLoading = useAppSelector(TicketIsLoadingSelector)

    React.useEffect(() => {
        console.log('useEffect running')
        if (!params.id) {
            return
        }
        dispatch(getTicketByIdThunk(Number(params.id)))
    }, [dispatch])

    if (isLoading) {
        return <p>Loading...</p>
    }

    const toggleEditMode = () => dispatch(setIsInEditMode(!isInEditMode))

    return (
        <div className="h-screen w-full flex flex-col">
            {isInEditMode ? <EditTicket /> : <DisplayTicket />}
            {!isInEditMode ? (
                <button
                    className="btn btn-primary self-center w-48"
                    onClick={toggleEditMode}>
                    Edit Ticket
                </button>
            ) : null}

            <Nav />
        </div>
    )
}
