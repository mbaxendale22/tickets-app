// eslint-disable-next-line import/default
import React from 'react'

import './App.css'
import { getTickets } from './api/Tickets'
import { APIStatus } from './context/contextTypes'
import { useTicketContext } from './context/ticketContext'
import { useUserContext } from './context/userContext'
import { LoginForm } from './Login'
import { TicketForm } from './Ticket'

const email = 'anna@email.com'
const password = 'password123'

function App() {
    const { apiStatus, getCurrentUser, userData, login, logout } =
        useUserContext()
    const { tickets } = useTicketContext()

    const isLoading = apiStatus === APIStatus.LOADING

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!userData && !isLoading) {
        return <div>No user data</div>
    }

    console.log('STATE IN THE APP:', userData)
    console.log({ apiStatus })

    const handleLogin = () => login(email, password)
    const handleLogout = () => logout()
    const getUserDetails = () => getCurrentUser()
    const handleGetTickets = () => getTickets()

    // build a login form using yup and formik

    return (
        <div className="App">
            <p>This should be the users email:</p>
            {userData ? (
                <p className="font-semibold, bg-orange-800, ">
                    Welcome {userData?.email}
                </p>
            ) : (
                'No user data'
            )}
            <div className="flex justify-evenly w-full">
                <button onClick={handleLogin}>Login</button>
                <button onClick={getUserDetails}>Who is logged in?</button>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleGetTickets}>
                    Lets Get Some Tickets
                </button>
            </div>
            <LoginForm />
            <TicketForm />
        </div>
    )
}

export default App
