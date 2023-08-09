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

export async function signUpUser(
    email: string,
    password: string,
): Promise<string | undefined> {
    try {
        const response = await axios.post('http://localhost:3333/auth/signup', {
            email,
            password,
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}
