import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
    TicketIsLoadingSelector,
    TicketSelector,
} from '../../../../redux/ticketSlice'
import { userDataThunk } from '../../../../thunks/userDataThunk'
import { Nav } from '../../Nav'

import { Row } from './Row'

export const TicketList = () => {
    const isLoading = useAppSelector(TicketIsLoadingSelector)
    const tickets = useAppSelector(TicketSelector)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const listHeight = window.innerHeight / 2

    const numOfTickets = tickets.length
    const userHasNoTickets = tickets.length === 0

    const checkForExistingTickets = () => {
        dispatch(userDataThunk())
    }
    React.useEffect(() => {
        if (userHasNoTickets) {
            checkForExistingTickets()
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    //TODO need to style this
    if (userHasNoTickets) {
        return (
            <>
                <div>{`Looks like you don't have any tickets yet`}</div>
                <button>Click here to get started</button>
                <Nav />
            </>
        )
    }

    console.log('tickets', tickets)
    return (
        <div className="w-full h-full flex flex-col space-y-12">
            {!isLoading ? (
                <>
                    <h1 className="text-semibold text-5xl text-center mt-12">
                        My Lastest Tickets
                    </h1>
                    <button className="btn btn-primary" onClick={handleLogout}>
                        Log out
                    </button>

                    <AutoSizer disableHeight>
                        {({ height = listHeight, width }) => (
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
                </>
            ) : (
                <h1 className="text-semibold text-5xl text-center mt-12">
                    Loading...
                </h1>
            )}
        </div>
    )
}
