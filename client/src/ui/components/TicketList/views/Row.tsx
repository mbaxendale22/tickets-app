import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { EditIcon, EyeIcon, TrashBinIcon } from '../../../../assets/Icons'
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
    // const [createdOn, setCreatedOn] = React.useState<string>('')

    const tickets = useAppSelector(TicketSelector)
    const ticketInFocus = useAppSelector(TicketInFocusSelector)
    //TODO might want to move this out to global state
    const currentTicket = tickets[index]

    const dateFormat = window.innerWidth > 500 ? 'long' : 'short'

    const createdOn = formatDate(currentTicket.createdAt, dateFormat)

    const handleShowTicket = () => {
        if (!currentTicket.id) {
            return
        }
        navigate(`/tickets/${currentTicket.id}`, { state: currentTicket.id })
    }
    const handleUpdateTicket = () => {
        if (!currentTicket.id) {
            return
        }
        navigate(`/tickets/edit/${currentTicket.id}`, {
            state: currentTicket.id,
        })
    }

    const selectTicketToBeDeleted = () => {
        dispatch(setTicketInFocus(currentTicket.id || 0))
    }

    const handleDeleteTicket = () => {
        // optimistic update
        dispatch(removeTicket(ticketInFocus))
        // api call
        dispatch(deleteTicketThunk(ticketInFocus))
    }

    const popupBody = `once it's gone, it's gone forever`

    return (
        <div
            style={style}
            className="flex justify-center align-center border-2 border-success px-4 rounded-md">
            <div className="flex justify-between items-center w-full">
                <p className="w-1/2 flex-shrink-1">{tickets[index].title}</p>
                <p>{createdOn}</p>
                <button onClick={handleShowTicket}>
                    <EyeIcon />
                </button>
                <button onClick={handleUpdateTicket}>
                    <EditIcon />
                </button>
                <button onClick={selectTicketToBeDeleted}>
                    <div className="modal-action mt-0">
                        <label htmlFor="my-modal" className="cursor-pointer">
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
