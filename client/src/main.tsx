import * as React from 'react'
// eslint-disable-next-line import/default
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { App } from './App'
import { persistor, store } from './redux/store'
import './index.css'
import { CreateTicket } from './ui/components/CreateTicket'
import { ShowTicket } from './ui/components/ShowTicket'
import { SortTicketList } from './ui/components/SortTicketList'
import { SearchByComfortLevel } from './ui/components/SortTicketList/views/SearchByComfort'
import { SearchByDate } from './ui/components/SortTicketList/views/SearchByDate'
import { SearchByEpic } from './ui/components/SortTicketList/views/SearchByEpic'
import { SearchByTitle } from './ui/components/SortTicketList/views/SearchByTitle'
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
        path: '/tickets/create',
        element: <CreateTicket />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tickets/:id',
        element: <ShowTicket />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tickets/sort',
        element: <SortTicketList />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tickets/sort/epic',
        element: <SearchByEpic />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tickets/sort/title',
        element: <SearchByTitle />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tickets/sort/date',
        element: <SearchByDate />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tickets/sort/comfort',
        element: <SearchByComfortLevel />,
        errorElement: <ErrorPage />,
    },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
