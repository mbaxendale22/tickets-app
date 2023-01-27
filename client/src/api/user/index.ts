import axios from 'axios'

import type { GetUserReponse } from './types'

export async function getUser(): Promise<GetUserReponse | undefined> {
    const token = window.localStorage.getItem('token')
    try {
        const response = await axios.get('http://localhost:3333/user/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}
