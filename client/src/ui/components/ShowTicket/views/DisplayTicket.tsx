import * as React from 'react'

type Props = {
    title: string
    description: string | undefined
    epic: string | undefined
    comfort_level: number | undefined
    learning_outcomes: string | undefined
    reflections: string | undefined
    link: string | undefined
    createdAt: string
    updatedAt: string
}

export const DisplayTicket = (props: Props) => {
    const { title } = props

    const captilise = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1)

    const createArrayfromProps = () => {
        const arr = []
        for (const [key, value] of Object.entries(props)) {
            if (key === 'title') {
                continue
            }
            if (key === 'comfort_level') {
                arr.push({ key: 'comfort level', value })
                continue
            }
            if (key === 'createdAt') {
                arr.push({ key: 'created on', value })
                continue
            }
            if (key === 'updatedAt') {
                arr.push({ key: 'last updated', value })
                continue
            }
            if (value) {
                arr.push({ key, value })
            }
        }
        return arr
    }

    const data = createArrayfromProps()

    return (
        <div>
            <h1 className="border-b-2 border-accent text-5xl px-8 pt-8 pb-2">
                {title}
            </h1>
            <div className="flex flex-col justify-center items-center mt-4">
                {data.map((item, index) => {
                    return (
                        <div
                            className="bg-slate-900 rounded-xl p-4 w-full sm:w-1/2 mb-4"
                            key={index}>
                            <h2 className="text-2xl">{captilise(item.key)}</h2>
                            <p>{item.value}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
