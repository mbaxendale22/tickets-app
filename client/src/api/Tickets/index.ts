import axios from 'axios'

import type { Ticket } from '../../context/contextTypes'

import type { NewTicket } from './types'

const token = window.localStorage.getItem('token')

export async function getTickets(): Promise<Ticket[] | undefined> {
    try {
        const response = await axios.get<Ticket[]>(
            'http://localhost:3333/ticket',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        return response.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export async function createNewTicket(newTicket: NewTicket) {
    try {
        const response = await axios.post<NewTicket>(
            'http://localhost:3333/ticket',
            newTicket,
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
export async function deleteTicketById(ticketId: number) {
    try {
        const response = await axios.delete(
            `http://localhost:3333/ticket/${ticketId}`,
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
