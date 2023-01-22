import { UserState } from '../../../context/contextTypes'
import { GetUserReponse } from '../types'

export const mockGetUserResponse: GetUserReponse = {
    data: {
        id: 1,
        createdAt: '2023-01-22T14:33:41.864Z',
        updatedAt: '2023-01-22T14:33:41.864Z',
        email: 'aya@email.com',
        firstName: 'Aya',
        lastName: 'Kocsis',
    },
}
