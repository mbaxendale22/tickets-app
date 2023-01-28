// eslint-disable-next-line import/default
import React, { useEffect } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

import { APIStatus } from './context/contextTypes'
import { useTicketContext } from './context/ticketContext'
import { useUserContext } from './context/userContext'
import { LoginForm } from './Login'
import { TicketForm } from './Ticket'
import { Nav } from './ui/components/Nav'

const email = 'anna@email.com'
const password = 'password123'

function App() {
    const { apiStatus, getCurrentUser, userData, login, logout } =
        useUserContext()
    const { getTickets, tickets, deleteTicket } = useTicketContext()

    const isLoading = apiStatus === APIStatus.LOADING
    const getUserDetails = () => getCurrentUser()

    if (isLoading && !userData) {
        return <div className="text-white">Loading...</div>
    }
    if (!userData && !isLoading) {
        return <div>No user data</div>
    }
    const userIsLoggedIn = userData?.id
    const ticketToBeDeleted = structuredClone(tickets)
    const ticketToBeDeletedId = ticketToBeDeleted.pop()?.id

    const handleLogin = () => login(email, password)
    const handleLogout = () => logout()

    const handleGetTickets = () => getTickets()

    const handleDeleteTicket = () => {
        if (ticketToBeDeletedId) {
            deleteTicket(ticketToBeDeletedId)
        }
    }
    const ticketsAvailable = tickets.length > 0
    const numOfTickets = tickets.length

    const TrashBinIcon = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
            </svg>
        )
    }

    const EditIcon = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
            </svg>
        )
    }
    const formatCreatedAt = (createdAt: string) => {
        const date = new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        return date.format(new Date(createdAt))
    }

    const Row = ({ index, style }: { index: number }) => {
        const createdOn = formatCreatedAt(tickets[index].createdAt)

        return (
            <div
                className="flex justify-center align-center border-2 border-success px-4 rounded-md"
                style={style}>
                <div className="flex justify-between items-center w-full">
                    <p>{tickets[index].title}</p>
                    <p>{createdOn}</p>
                    <EditIcon />
                    <TrashBinIcon />
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen w-full flex flex-col">
            <h1>Welcome to Tickets</h1>
            <div>
                <button className="btn bg-primary" onClick={getCurrentUser}>
                    Get My Details
                </button>
                <button className="btn bg-primary" onClick={handleGetTickets}>
                    Get My tickets
                </button>
            </div>
            {userIsLoggedIn && ticketsAvailable ? (
                <>
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
                </>
            ) : (
                <LoginForm />
            )}
        </div>
    )
}

export default App
