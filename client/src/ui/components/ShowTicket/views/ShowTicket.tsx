import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {} from '../../../../redux/applicationSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { TicketIsLoadingSelector } from '../../../../redux/ticketSlice'
import { getTicketByIdThunk } from '../../../../thunks/getTicketByIdThunk'
import { Nav } from '../../Nav'

import { DisplayTicket } from './DisplayTicket'

//TODO DisplayTicket is working n refresh but edit ticket OU is broken now.

export const ShowTicket = () => {
    const dispatch = useAppDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const isLoading = useAppSelector(TicketIsLoadingSelector)

    React.useEffect(() => {
        if (!params.id) {
            return
        }
        dispatch(getTicketByIdThunk(Number(params.id)))
    }, [dispatch])

    if (isLoading) {
        return <p>Loading...</p>
    }

    const navToEditMode = () => navigate(`/tickets/edit/${params.id}`)

    return (
        <div className="h-screen w-full flex flex-col">
            <DisplayTicket />

            <button
                className="btn btn-primary self-center w-48"
                onClick={navToEditMode}>
                Edit Ticket
            </button>

            <Nav />
        </div>
    )
}
