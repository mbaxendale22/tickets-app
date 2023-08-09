import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

import { setNavState } from '../../../../redux/applicationSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { persistor } from '../../../../redux/store'
import {
    TicketIsLoadingSelector,
    TicketSelector,
} from '../../../../redux/ticketSlice'
import { userDataThunk } from '../../../../thunks/userDataThunk'
import { NavigationKeys } from '../../../../utils/constants'
import { PageHeader } from '../../componentLibrary/PageHeader'
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
        persistor.purge()
        navigate('/')
    }

    const sendToCreateTicket = () => {
        dispatch(setNavState(NavigationKeys.CREATE))
        navigate('/tickets/create')
    }

    //TODO need to style this
    if (userHasNoTickets) {
        return (
            <div className="h-screen w-full flex flex-col justify-center items-center">
                <p className="text-3xl pb-6">{`Looks like you don't have any tickets yet`}</p>
                <p
                    className="text-3xl cursor-pointer text-success pb-6"
                    onClick={sendToCreateTicket}>
                    Click here to get started
                </p>
                <button
                    className="btn btn-primary self-center"
                    onClick={handleLogout}>
                    Log out
                </button>
                <Nav />
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col space-y-12">
            <PageHeader title="My Latest Tickets" />
            <div className="w-full h-full flex flex-col space-y-12 md:p-8">
                {!isLoading ? (
                    <>
                        <button
                            className="btn btn-primary self-center"
                            onClick={handleLogout}>
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
                    </>
                ) : (
                    <h1 className="text-semibold text-5xl text-center mt-12">
                        Loading...
                    </h1>
                )}
            </div>
            <Nav />
        </div>
    )
}
