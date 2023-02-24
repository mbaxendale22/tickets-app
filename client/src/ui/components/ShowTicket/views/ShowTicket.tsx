import * as React from 'react'
import { useLocation } from 'react-router-dom'

import {
    isInEditModeSelector,
    setIsInEditMode,
} from '../../../../redux/applicationSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { TicketByIdSelector } from '../../../../redux/ticketSlice'
import { formatDate } from '../../../../utils/format'
import { Nav } from '../../Nav'

import { DisplayTicket } from './DisplayTicket'
import { EditTicket } from './EditTicket'

export const ShowTicket = () => {
    const location = useLocation()
    const ticket = useAppSelector(TicketByIdSelector(location.state))
    const isInEditMode = useAppSelector(isInEditModeSelector)
    const dispatch = useAppDispatch()

    if (!ticket) {
        return null
    }

    const {
        id,
        title,
        description,
        epic,
        comfort_level,
        learning_outcomes,
        reflections,
        link,
        createdAt,
        updatedAt,
    } = ticket

    const formattedCreatedAt = formatDate(createdAt, 'long')
    const formattedUpdatedAt = formatDate(updatedAt, 'long')
    const toggleEditMode = () => dispatch(setIsInEditMode(!isInEditMode))

    return (
        <div className="h-screen w-full flex flex-col">
            {isInEditMode ? (
                <EditTicket
                    id={id}
                    title={title}
                    description={description}
                    epic={epic}
                    comfort_level={comfort_level}
                    learning_outcomes={learning_outcomes}
                    reflections={reflections}
                    link={link}
                    createdAt={formattedCreatedAt}
                    updatedAt={formattedUpdatedAt}
                />
            ) : (
                <DisplayTicket
                    title={title}
                    description={description}
                    epic={epic}
                    comfort_level={comfort_level}
                    learning_outcomes={learning_outcomes}
                    reflections={reflections}
                    link={link}
                    createdAt={formattedCreatedAt}
                    updatedAt={formattedUpdatedAt}
                />
            )}
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
