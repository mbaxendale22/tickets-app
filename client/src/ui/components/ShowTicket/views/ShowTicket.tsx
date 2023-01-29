import * as React from 'react'
import { useLocation } from 'react-router-dom'

// interface Props {
//     myProp: string
// }

export const ShowTicket = () => {
    // const { myProp } = props
    const { state } = useLocation()
    console.log(state)

    // make the api call to get the ticket data

    return (
        <div>
            <p>THIS IS THE SHOW TICKET PAGE</p>
        </div>
    )
}
