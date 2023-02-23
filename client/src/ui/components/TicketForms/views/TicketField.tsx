import { ErrorMessage, Field } from 'formik'
import * as React from 'react'

interface Props {
    label: string
    name: string
    type: string
    placeholder: string
    isHeader?: boolean
}

export const TicketField = (props: Props) => {
    const { label, name, placeholder, type } = props

    const headerStyles = `border-b-2 border-accent text-5xl`
    return (
        <div className="mb-4">
            <label>
                <h1 className={headerStyles}>{label}</h1>
            </label>
            <div className="form-control">
                <div className="input-group">
                    <Field
                        className={`input input-bordered`}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                    />
                </div>
                <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs font-medium"
                />
            </div>
        </div>
    )
}
