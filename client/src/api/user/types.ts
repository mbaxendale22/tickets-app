export type GetUserReponse = {
    req: {
        id: number
        createdAt: string
        updatedAt: string
        email: string
        firstName: string | null
        lastName: string | null
    }
}
