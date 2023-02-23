import * as React from 'react'

import { Nav } from '../../Nav'

interface Props {
    myProp: string
}

export const CreateTicket = (props: Props) => {
    const { myProp } = props
    return (
        <div>
            <h1>Create Ticket Page</h1>
            <p>{myProp}</p>
            <Nav />
        </div>
    )
}
