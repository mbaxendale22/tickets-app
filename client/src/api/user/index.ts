import axios from 'axios'

import type { GetUserReponse } from './types'

export async function getUser(
    token: string,
): Promise<GetUserReponse | undefined> {
    try {
        const response = await axios.get('http://localhost:3333/user/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}
