import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

import { APIStatus } from './context/contextTypes'
import { useTicketContext } from './context/ticketContext'
import { useUserContext } from './context/userContext'

interface FormValues {
    completed: string
    // userId: number
    title: string
    description?: string
    epic?: string
    learning_outcomes?: string
    reflections?: string
    comfort_level?: number
    link?: string
}

const now = new Date().toISOString()

export const TicketForm: React.FC = () => {
    const { apiStatus, createTicket } = useTicketContext()
    const { userData } = useUserContext()
    const initialValues: FormValues = {
        completed: now,
        title: '',
        description: '',
        epic: '',
        learning_outcomes: '',
        reflections: '',
        comfort_level: 0,
        link: '',
    }

    const validationSchema = Yup.object({
        completed: Yup.string().optional(),
        title: Yup.string().required(' A Title is required'),
        description: Yup.string().optional(),
        epic: Yup.string().optional(),
        learning_outcomes: Yup.string().optional(),
        reflections: Yup.string().optional(),
        comfort_level: Yup.number().optional(),
        link: Yup.string().url('Must be a valid URL').optional(),
    })

    const isLoading = apiStatus === APIStatus.LOADING
    const isError = apiStatus === APIStatus.ERROR
    //! TODO the handle submit function is being called but the createTicket function is not being called??

    const handleSubmit = (values: FormValues) => {
        const newTicket = {
            ...values,
            userId: userData?.id || 0,
        }
        createTicket(newTicket)
    }

    return (
        // <div className="bg-gray-200 h-screen flex items-center justify-center">
        <div className="w-full max-w-xs">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-medium mb-4">
                            Create a Ticket
                        </h2>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="title">
                                Title
                            </label>
                            <Field
                                className={`w-full p-2 rounded-lg border-blue-600 border-2 ${
                                    errors.title && touched.title
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                                name="title"
                                type="title"
                            />
                            <ErrorMessage
                                name="title"
                                component="div"
                                className="text-red-500 text-xs font-medium"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="description">
                                Description
                            </label>
                            <Field
                                className={`w-full p-2 rounded-lg border-blue-600 border-2 `}
                                name="description"
                                type="description"
                            />
                        </div>

                        {isError && (
                            <div className="text-red-500 text-xs font-medium">
                                {"Error: Couldn't log in"}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Create Ticket'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
        // </div>
    )
}
