import * as React from 'react'
// eslint-disable-next-line import/default
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { App } from './App'
import { ApplicationContextProvider } from './context/application'
import { persistor, store } from './redux/store'
import './index.css'
import { CreateTicket } from './ui/components/CreateTicket'
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
        path: '/tickets/create',
        element: <CreateTicket myProp="hello" />,
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
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApplicationContextProvider>
                    <RouterProvider router={router} />
                </ApplicationContextProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
