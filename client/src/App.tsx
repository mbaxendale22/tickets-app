import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './redux/hooks'
import { UserAccessTokenSelector } from './redux/userSlice'
import { userDataThunk } from './thunks/userDataThunk'
import { LoginForm } from './ui/components/Login'
import { userIsAuthenticated } from './utils/user'

export const App = () => {
    const navigate = useNavigate()

    const token = useAppSelector(UserAccessTokenSelector)
    const dispatch = useAppDispatch()

    const userIsLoggedIn = userIsAuthenticated(token)

    React.useEffect(() => {
        if (userIsLoggedIn) {
            dispatch(userDataThunk())
            navigate('/tickets')
        }
    }, [userIsLoggedIn, navigate, token])

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
