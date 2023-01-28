import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { TicketContextProvider } from './context/ticketContext'
import { UserContextProvider } from './context/userContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <UserContextProvider>
            <TicketContextProvider>
                <App />
            </TicketContextProvider>
        </UserContextProvider>
    </React.StrictMode>,
)
