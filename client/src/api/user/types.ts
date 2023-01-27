export type GetUserReponse = {
    req: {
        id: number
        createdAt: string
        updatedAt: string
        email: string
        firstName: string | undefined
        lastName: string | undefined
        tickets: number[]
    }
}
