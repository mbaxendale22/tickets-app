import { useContext } from 'react'
import { getUser } from '../api/user'
import { UserContext } from '../context/userContext'

export async function useGetUser() {
    const userContext = useContext(UserContext)

    try {
        userContext.dispatch({ type: 'START_USER_REQUEST' })

        const { req } = await getUser()

        userContext.dispatch({ type: 'SET_USER', payload: req })

        userContext.dispatch({ type: 'END_USER_REQUEST' })
    } catch {
        userContext.dispatch({ type: 'ERROR_USER_REQUEST' })
    }
}
