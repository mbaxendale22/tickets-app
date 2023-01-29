import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserContext } from './context/userContext'
import { LoginForm } from './ui/Login'
import { userIsAuthenticated } from './utils/user'

export const App = () => {
    const navigate = useNavigate()

    const userIsLoggedIn = userIsAuthenticated()
    const { userData } = useUserContext()

    React.useEffect(() => {
        if (userIsLoggedIn) {
            navigate('/tickets')
        }
    }, [userIsLoggedIn, navigate, userData])

    return (
        <div className="w-full h-screen flex flex-col items-center justify-evenly">
            <div className="">
                <h1 className="text-center text-5xl font-semibold">
                    Welcome to Tickets
                </h1>
                <h2 className="text-center text-2xl pt-6">
                    Track your journey from Junior to Senior Developer and
                    beyond...
                </h2>
            </div>
            <LoginForm />
        </div>
    )
}
