import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { EditIcon, TrashBinIcon } from '../../../../assets/Icons'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
    removeTicket,
    setTicketInFocus,
    TicketInFocusSelector,
    TicketSelector,
} from '../../../../redux/ticketSlice'
import { deleteTicketThunk } from '../../../../thunks/deleteTicketThunk'
import { formatDate } from '../../../../utils/format'

interface Props {
    index: number
    style: React.CSSProperties
}

export const Row = (props: Props) => {
    const { index, style } = props
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const tickets = useAppSelector(TicketSelector)
    const ticketInFocus = useAppSelector(TicketInFocusSelector)
    //TODO might want to move this out to global state
    const currentTicket = tickets[index]

    const createdOn = formatDate(currentTicket.createdAt)

    const handleUpdateTicket = () => {
        navigate(`/tickets/${currentTicket.id}`, { state: currentTicket })
    }

    const selectTicketToBeDeleted = () => {
        dispatch(setTicketInFocus(currentTicket.id || 0))
    }

    const handleDeleteTicket = () => {
        // optisimistic update
        dispatch(removeTicket(ticketInFocus))
        // api call
        dispatch(deleteTicketThunk(ticketInFocus))
    }

    const popupBody = `once it's gone, it's gone forever`

    console.log('ticketInFocus', ticketInFocus)

    return (
        <div
            style={style}
            className="flex justify-center align-center border-2 border-success px-4 rounded-md">
            <div className="flex justify-between items-center w-full">
                <p>{tickets[index].title}</p>
                <p>{createdOn}</p>
                <button onClick={handleUpdateTicket}>
                    <EditIcon />
                </button>
                <button onClick={selectTicketToBeDeleted}>
                    <div className="modal-action mt-0">
                        <label htmlFor="my-modal">
                            <TrashBinIcon />
                        </label>
                    </div>
                </button>
            </div>

            <input type="checkbox" id="my-modal" className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">
                        Are you sure you want to delete this ticket?
                    </h3>
                    <p className="py-4 text-center">{popupBody}</p>
                    <div className="flex w-full justify-evenly">
                        <div className="modal-action mt-0">
                            <label
                                onClick={handleDeleteTicket}
                                className="btn btn-success"
                                htmlFor="my-modal">
                                Confirm
                            </label>
                        </div>
                        <div className="modal-action mt-0">
                            <label htmlFor="my-modal" className="btn btn-error">
                                cancel
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
