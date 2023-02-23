import * as React from 'react'
import { useLocation } from 'react-router-dom'

import { useApplicationContext } from '../../../../context/application'
import type { Ticket } from '../../../../context/contextTypes'
import { formatDate } from '../../../../utils/format'
import { Nav } from '../../Nav'

import { DisplayTicket } from './DisplayTicket'
import { EditTicket } from './EditTicket'

// interface Props {
//     myProp: string
// }

export const ShowTicket = () => {
    // const { myProp } = props
    const { state }: { state: Ticket } = useLocation()
    const { isInEditMode, setIsInEditMode } = useApplicationContext()

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
    } = state

    const formattedCreatedAt = formatDate(createdAt)
    const formattedUpdatedAt = formatDate(updatedAt)
    const toggleEditMode = () => setIsInEditMode(!isInEditMode)

    return (
        <div className="h-screen w-full">
            <button className="btn btn-primary" onClick={toggleEditMode}>
                {isInEditMode ? 'Save' : 'Edit'}
            </button>
            {isInEditMode ? (
                <EditTicket
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

            <Nav />
        </div>
    )
}
