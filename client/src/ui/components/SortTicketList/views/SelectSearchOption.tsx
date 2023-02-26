import * as React from 'react'
import { useNavigate } from 'react-router-dom'

enum SearchOptions {
    title = 'title',
    date = 'date',
    epic = 'epic',
    comfort = 'comfort',
}

export const SelectSearchOption = () => {
    const navigate = useNavigate()

    const handlePress = (search: string, e: any) => {
        e.preventDefault()
        navigate(`/tickets/sort/${search}`)
    }
    return (
        <div className="flex flex-col justify-center p-8 w-full sm:w-3/4">
            <button
                className="btn btn-primary my-2"
                onClick={(e) => handlePress(SearchOptions.title, e)}>
                Search by Ticket Name
            </button>
            <button
                className="btn btn-primary my-2"
                onClick={(e) => handlePress(SearchOptions.date, e)}>
                Search by Date
            </button>
            <button
                className="btn btn-primary my-2"
                onClick={(e) => handlePress(SearchOptions.epic, e)}>
                Search by Epic
            </button>
            <button
                className="btn btn-primary my-2"
                onClick={(e) => handlePress(SearchOptions.comfort, e)}>
                Search by Comfort Level
            </button>
        </div>
    )
}
