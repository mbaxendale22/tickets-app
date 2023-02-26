import * as React from 'react'

import { PageHeader } from '../../componentLibrary/PageHeader'
import { Nav } from '../../Nav'

import { SelectSearchOption } from './SelectSearchOption'

export const SortTicketList = () => {
    return (
        <div>
            <PageHeader title="Search for Tickets" />
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-2xl pt-8">
                    How would you like to search for tickets?
                </h3>
                <SelectSearchOption />
            </div>

            <Nav />
        </div>
    )
}
