import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { UserContext } from './context/userContext'
import { useGetUser } from './thunks/useGetUser'
import { getUser } from './api/user'

function App() {
    // const { state } = useContext(UserContext)
    const [testState, setTestState] = useState()

    //! TODO API call is working and returning data
    // but we need a mechanism to handle the actions - like a thunk!

    async function testCall() {
        console.log('clicked')
        // console.log(state.userData)
    }

    return (
        <div className="App mt-2 bg-red-500">
            <h1>Hello world</h1>
            <button onClick={f}>Click to Test API</button>
        </div>
    )
}

export default App
