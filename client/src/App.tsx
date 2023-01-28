import * as React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

import { EditIcon, TrashBinIcon } from './assets/Icons'
import { APIStatus } from './context/contextTypes'
import { useTicketContext } from './context/ticketContext'
import { useUserContext } from './context/userContext'
import { TicketForm } from './Ticket'
import { Nav } from './ui/components/Nav'
import { LoginForm } from './ui/Login'

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
