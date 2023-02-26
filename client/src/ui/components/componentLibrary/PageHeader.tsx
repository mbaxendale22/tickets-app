import * as React from 'react'
type Props = {
    title: string
}

export const PageHeader = (props: Props) => {
    const { title } = props
    return (
        <h1 className="border-b-2 border-accent text-5xl px-8 pt-8 pb-2">
            {title}
        </h1>
    )
}
