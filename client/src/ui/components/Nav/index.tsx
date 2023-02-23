import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { useApplicationContext } from '../../../context/application'

export const Nav = () => {
    // eventually you'll want to pass this in as a prop
    const { navstate, setNavstate } = useApplicationContext()
    const navigate = useNavigate()

    const selectScreen = (id: string) => {
        switch (id) {
            case '1':
                navigate('/tickets')
                break
            case '2':
                navigate('/tickets/create')
                break
            case '3':
                navigate('/tickets/sort')
                break
            default:
                break
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.target as HTMLButtonElement
        setNavstate(button.id)
        selectScreen(button.id)
    }

    return (
        <div className="btm-nav">
            <button
                id="1"
                className={`text-success ${navstate === '1' ? 'active' : ''}`}
                onClick={handleClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            </button>
            <button
                className={`text-success ${navstate === '2' ? 'active' : ''}`}
                id="2"
                onClick={handleClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
            <button
                className={`text-success ${navstate === '3' ? 'active' : ''}`}
                id="3"
                onClick={handleClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </button>
        </div>
    )
}
