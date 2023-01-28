import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

import { APIStatus } from '../../context/contextTypes'
import { useUserContext } from '../../context/userContext'

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
                            <div className="form-control">
                                <div className="input-group">
                                    <Field
                                        className={`input input-bordered ${
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

                                    <button className="btn btn-square">
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
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
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

export default function LoginInput() {
    return <div>LoginInput</div>
}
