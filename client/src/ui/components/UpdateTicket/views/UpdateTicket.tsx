import React from 'react'

interface Props {
    myProp: string
}

export const UpdateTicket = (props: Props) => {
    const { myProp } = props
    return (
        <div>
            <p>{myProp}</p>
        </div>
    )
}

