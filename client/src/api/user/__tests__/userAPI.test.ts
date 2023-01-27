import axios from 'axios'
import moxios from 'moxios'

import { mockGetUserResponse } from './mockAPIData'

describe('User API Calls', () => {
    beforeEach(() => {
        moxios.install(axios)
    })
    afterEach(() => {
        moxios.uninstall()
    })

    describe('sign up', () => {
        it('should fetch user data', async () => {
            const response = mockGetUserResponse

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response,
                })
            })

            const result = await axios.get('/localhost:3000/user/me')

            expect(result.data).toEqual(response)
        })
    })
})
