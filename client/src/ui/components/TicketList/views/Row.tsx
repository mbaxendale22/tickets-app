import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { EditIcon, TrashBinIcon } from '../../../../assets/Icons'
import { useTicketContext } from '../../../../context/ticketContext'
import { formatDate } from '../../../../utils/format'

interface Props {
    index: number
    style: React.CSSProperties
}

export const Row = (props: Props) => {
    const { index, style } = props
    const { tickets, deleteTicket } = useTicketContext()
    const navigate = useNavigate()
    const currentTicket = tickets[index]
    const createdOn = formatDate(currentTicket.createdAt)
    const handleUpdateTicket = () => {
        navigate(`/tickets/${currentTicket.id}`, { state: currentTicket })
    }

    // TODO you'll want to add a confirmation dialog here
    const handleDeleteTicket = () => {
        if (!currentTicket) {
            return
        }
        deleteTicket(currentTicket.id || 0)
        console.log('delete ticket')
    }

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
                <button>
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
                    <h3 className="font-bold text-lg">
                        Are you sure you want to delete this ticket?
                    </h3>
                    <p className="py-4 text-center">
                        ${`Once it's deleted, it's gone forever`}.
                    </p>
                    <div className="flex w-full justify-evenly">
                        <button
                            onClick={handleDeleteTicket}
                            className="btn btn-success">
                            Confirm
                        </button>
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
