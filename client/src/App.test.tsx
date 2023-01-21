import { render } from '@testing-library/react'
import App from './App'

describe('setup test', () => {
    it('title should render', () => {
        const { getByText } = render(<App />)
        const hello = getByText('Hello world')
        expect(hello).toBeInTheDocument()
    })
})
