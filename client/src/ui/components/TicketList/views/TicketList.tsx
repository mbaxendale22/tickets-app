import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

import { useTicketContext } from '../../../../context/ticketContext'
import { useUserContext } from '../../../../context/userContext'
import { Nav } from '../../Nav'

import { Row } from './Row'

export const TicketList = () => {
    const { apiStatus: userApiStatus, userData } = useUserContext()
    const {
        apiStatus: ticketApiStatus,
        tickets,
        getTickets,
    } = useTicketContext()
    const navigate = useNavigate()

    const numOfTickets = tickets.length

    const isLoading =
        userApiStatus === 'LOADING' || ticketApiStatus === 'LOADING'
    const userDetailsLoaded =
        userApiStatus === 'SUCCESS' || userData.id !== null

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    React.useEffect(() => {
        if (userDetailsLoaded) {
            getTickets()
        }
    }, [userDetailsLoaded])

    if (isLoading) {
        return <div>Loading...</div>
    }

    //TODO this needs to be styled
    if (tickets.length === 0) {
        return (
            <>
                <div>${`Looks like you don't have any tickets yet`}</div>
                <button>Click here</button>
            </>
        )
    }

    return (
        <div className="w-full h-full flex flex-col space-y-12">
            <h1 className="text-semibold text-5xl text-center mt-12">
                My Lastest Tickets
            </h1>
            <button className="btn btn-primary" onClick={handleLogout}>
                Log out
            </button>

            <AutoSizer>
                {({ height, width }) => (
                    <List
                        className="List"
                        height={height}
                        itemCount={numOfTickets}
                        itemSize={50}
                        width={width}>
                        {Row}
                    </List>
                )}
            </AutoSizer>

            <Nav />
        </div>
    )
}
