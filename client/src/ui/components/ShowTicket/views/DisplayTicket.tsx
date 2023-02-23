import * as React from 'react'

type Props = {
    title: string
    description: string | undefined
    epic: string | undefined
    comfort_level: number | undefined
    learning_outcomes: string | undefined
    reflections: string | undefined
    link: string | undefined
    createdAt: string
    updatedAt: string
}

export const DisplayTicket = (props: Props) => {
    const {
        title,
        description,
        epic,
        comfort_level,
        learning_outcomes,
        reflections,
        link,
        createdAt,
        updatedAt,
    } = props
    return (
        <>
            <h1 className="border-b-2 border-accent text-5xl">{title}</h1>
            <h2>{description || ''}</h2>
            <h3>{`Epic: ${epic || 'no epic attached'}`}</h3>
            <p>{`Ticket Created: ${createdAt}`}</p>
            <p>{`Ticket Last Updated: ${updatedAt}`}</p>
            <p>{comfort_level || ''}</p>
            <p>{`General Reflections: ${
                reflections || 'no reflections yet'
            }`}</p>
            <p>
                {`Learning Outcomes: ${
                    learning_outcomes || 'no learning outcomes yet'
                }`}
            </p>
            <p>{link || ''}</p>
        </>
    )
}
