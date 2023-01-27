import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

import { APIStatus } from './context/contextTypes'
import { useUserContext } from './context/userContext'

interface FormValues {
    email: string
    password: string
}

export const LoginForm: React.FC = () => {
    const { login, apiStatus } = useUserContext()
    const initialValues: FormValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    const isLoading = apiStatus === APIStatus.LOADING
    const isError = apiStatus === APIStatus.ERROR

    const handleSubmit = (values: FormValues) => {
        const { email, password } = values
        login(email, password)
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
                        <h2 className="text-lg font-medium mb-4">Log In</h2>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="email">
                                Email
                            </label>
                            <Field
                                className={`w-full p-2 rounded-lg border-blue-600 border-2 ${
                                    errors.email && touched.email
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                                name="email"
                                type="email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-xs font-medium"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="password">
                                Password
                            </label>
                            <Field
                                className={`w-full p-2 rounded-lg border-blue-600 border-2 ${
                                    errors.password && touched.password
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                                name="password"
                                type="password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-xs font-medium"
                            />
                        </div>

                        {isError && (
                            <div className="text-red-500 text-xs font-medium">
                                {"Error: Couldn't log in"}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Log In'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
        // </div>
    )
}
