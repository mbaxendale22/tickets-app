export type PostLogin = {
    data: {
        access_token: string
    }
}
export type PostSignup = {
    data: {
        id: number
        createdAt: string
        updatedAt: string
        email: string
        firstName: string | null
        lastName: string | null
    }
}
