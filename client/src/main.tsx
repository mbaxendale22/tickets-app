import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { App } from './App'
import { TicketContextProvider } from './context/ticketContext'
import { UserContextProvider } from './context/userContext'
import './index.css'
import { ShowTicket } from './ui/components/ShowTicket'
import { TicketList } from './ui/components/TicketList'
import { ErrorPage } from './ui/ErrorPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tickets',
        element: <TicketList />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tickets/:ticketId',
        element: <ShowTicket />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tickets/sort',
        element: <App />,
        errorElement: <ErrorPage />,
    },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <UserContextProvider>
            <TicketContextProvider>
                <RouterProvider router={router} />
            </TicketContextProvider>
        </UserContextProvider>
    </React.StrictMode>,
)
