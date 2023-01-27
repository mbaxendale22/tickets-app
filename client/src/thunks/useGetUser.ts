import { useContext, useEffect, useState } from 'react'
import { getUser } from '../api/user'
import { GetUserReponse } from '../api/user/types'
import { ActionTypes } from '../context/contextTypes'
import { UserContext } from '../context/userContext'

export function useGetUser() {
    const userContext = useContext(UserContext)
    const [userInfo, setUserInfo] = useState<GetUserReponse>()

    useEffect(() => {
        const testCall = async () => {
            userContext.dispatch({ type: ActionTypes.START_USER_REQUEST })
            try {
                const response = await getUser()
                userContext.dispatch({
                    type: ActionTypes.SET_USER,
                    payload: response.req,
                })

                setUserInfo(response)

                userContext.dispatch({ type: ActionTypes.END_USER_REQUEST })
            } catch {
                userContext.dispatch({ type: ActionTypes.SET_USER_ERROR })
            }
        }

        testCall()
    }, [])
    return userInfo?.req
}
