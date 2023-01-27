import axios from 'axios'

import type { Ticket } from '../../context/contextTypes'

import type { NewTicket } from './types'

export async function getTickets(): Promise<Ticket[] | undefined> {
    const token = window.localStorage.getItem('token')
    try {
        const response = await axios.get<Ticket[]>(
            'http://localhost:3333/ticket',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export async function createNewTicket(newTicket: NewTicket) {
    console.log('***** hello', newTicket)
    try {
        const response = await axios.post<NewTicket>(
            'http://localhost:3333/ticket',
            newTicket,
        )
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}
