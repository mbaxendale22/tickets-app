import axios from 'axios'

export async function loginUser(
    email: string,
    password: string,
): Promise<string | undefined> {
    try {
        const response = await axios.post('http://localhost:3333/auth/login', {
            email,
            password,
        })
        const { access_token } = response.data
        return access_token
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
