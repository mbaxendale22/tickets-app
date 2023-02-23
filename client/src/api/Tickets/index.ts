import axios from 'axios'

import type { Ticket } from '../../redux/ticketSlice'

import type { NewTicket } from './types'

export async function getTickets(token: string): Promise<Ticket[] | undefined> {
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

export async function createNewTicket(newTicket: NewTicket, token: string) {
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
export async function deleteTicketById(ticketId: number, token: string) {
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

export async function updateTicketById(
    ticketId: number,
    ticketToUpdate: NewTicket,
    token: string,
) {
    try {
        const response = await axios.patch(
            `http://localhost:3333/ticket/${ticketId}`,
            ticketToUpdate,
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
