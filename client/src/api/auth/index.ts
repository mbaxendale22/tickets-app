import axios from 'axios'

import { setTokenInLocalStorage } from '../../utils/user'

import type { PostLogin } from './types'

export async function loginUser(
    email: string,
    password: string,
): Promise<PostLogin | undefined> {
    try {
        const response = await axios.post('http://localhost:3333/auth/login', {
            email,
            password,
        })

        const { access_token } = response.data
        setTokenInLocalStorage(access_token)
        return response.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}

// export async function signup(): Promise<PostLogin | undefined> {
//     try {
//         const response = await axios.get('http://localhost:3333/user/me', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//         console.log(response.data)
//         return response.data
//     } catch (error) {
//         console.log(error)
//         return undefined
//     }
// }
