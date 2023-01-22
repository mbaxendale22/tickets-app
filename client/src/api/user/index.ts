import axios from 'axios'
import { GetUserReponse } from './types'

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiYW5uYUBlbWFpbC5jb20iLCJpYXQiOjE2NzQ0MDI0ODUsImV4cCI6MTY3NDQwMzM4NX0.Vo2-Jveun3GbY_VBQ5ZCcXSNoqXNHtMAwwHk6F_TLnI'

export async function getUser(): Promise<GetUserReponse> {
    try {
        const response = await axios.get('http://localhost:3333/user/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        throw error
    }
}
