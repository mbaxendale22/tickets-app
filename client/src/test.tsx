// write a template react component
import React from 'react'

interface Props {
    myProp: string
}

export const MyComponent: React.FC<Props> = (props: Props) => {
    const { myProp } = props
    return (
        <div>
            <p>{myProp}</p>
        </div>
    )
}
