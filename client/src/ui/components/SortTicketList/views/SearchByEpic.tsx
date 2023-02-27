import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
    clearSortedTickets,
    epicSelector,
    setSortedTickets,
    sortedTicketsSelector,
    TicketIsLoadingSelector,
} from '../../../../redux/ticketSlice'
import { UserAccessTokenSelector } from '../../../../redux/userSlice'
import { setInitialTickets } from '../../../../thunks/setInitialTickets'
import { PageHeader } from '../../componentLibrary/PageHeader'
import { Nav } from '../../Nav'

import { SearchRow } from './SearchRow'

export const SearchByEpic = () => {
    const availableEpics = useAppSelector(epicSelector())
    const access_token = useAppSelector(UserAccessTokenSelector)
    const isLoading = useAppSelector(TicketIsLoadingSelector)
    const numOfTickets = useAppSelector(sortedTicketsSelector).length || 0
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const listHeight = window.innerHeight / 2

    //Todo: remaking this request is expensive, could persist epic data in state, could create an endpoint to get all epics
    React.useEffect(() => {
        dispatch(setInitialTickets(access_token))
    }, [])

    const handleChange = (e: any) => {
        const epic = e.target.value
        dispatch(setSortedTickets(epic))
    }

    const handleClick = () => {
        dispatch(clearSortedTickets())
        navigate('/tickets/sort')
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-full h-screen">
            <PageHeader title="Search by Epic" />
            <div className="flex flex-col justify-center items-center py-12">
                <select
                    className="select select-info w-full max-w-xs "
                    onChange={handleChange}
                    defaultValue={'Select Epic'}>
                    <option value="Select Epic" disabled>
                        Select Epic
                    </option>
                    {availableEpics.map((epic, i) => {
                        return (
                            <option value={epic} key={i}>
                                {epic}
                            </option>
                        )
                    })}
                </select>
            </div>
            <AutoSizer disableHeight>
                {({ height = listHeight, width }) => (
                    <List
                        className="List"
                        height={height}
                        itemCount={numOfTickets}
                        itemSize={50}
                        width={width}>
                        {SearchRow}
                    </List>
                )}
            </AutoSizer>
            <div className="w-full flex justify-center items-center">
                <button className="btn btn-error" onClick={handleClick}>
                    Back to Search Options
                </button>
            </div>
            <Nav />
        </div>
    )
}
