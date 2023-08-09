import * as React from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
    TicketIsLoadingSelector,
    viewTicketSelector,
} from '../../../../redux/ticketSlice'
import { getTicketByIdThunk } from '../../../../thunks/getTicketByIdThunk'
import { formatDate } from '../../../../utils/format'

export const DisplayTicket = () => {
    const params = useParams()
    const dispatch = useAppDispatch()
    const ticketId = Number(params.ticketId || 0)
    const isLoading = useAppSelector(TicketIsLoadingSelector)
    const ticket = useAppSelector(viewTicketSelector)

    React.useEffect(() => {
        if (ticket === null) {
            dispatch(getTicketByIdThunk(ticketId))
        }
    }, [dispatch])

    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1)

    const createArrayFromProps = () => {
        if (!ticket) {
            return null
        }
        const arr = []
        for (const [key, value] of Object.entries(ticket)) {
            if (key === 'title' || key === 'userId' || key === 'id') {
                continue
            }
            if (key === 'comfort_level') {
                arr.push({ key: 'comfort level', value })
                continue
            }
            if (key === 'createdAt') {
                const formattedCreatedAt = formatDate(value, 'long')
                arr.push({ key: 'created on', value: formattedCreatedAt })
                continue
            }
            if (key === 'updatedAt') {
                const formattedUpdatedAt = formatDate(value, 'long')
                arr.push({ key: 'last updated', value: formattedUpdatedAt })
                continue
            }

            if (value) {
                arr.push({ key, value })
            }
        }
        return arr
    }

    const data = createArrayFromProps()
    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1 className="border-b-2 border-accent text-5xl px-8 pt-8 pb-2">
                {ticket?.title}
            </h1>
            <div className="flex flex-col justify-center items-center mt-4">
                {data?.map((item, index) => {
                    return (
                        <div
                            className="bg-slate-900 rounded-xl p-4 w-full sm:w-1/2 mb-4"
                            key={index}>
                            <h2 className="text-2xl">{capitalize(item.key)}</h2>
                            <p>{item.value}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
