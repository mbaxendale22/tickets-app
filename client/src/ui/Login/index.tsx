import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

import { EmailIcon, EyeIcon, EyeSlashedIcon } from '../../assets/Icons'
import { APIStatus } from '../../context/contextTypes'
import { useUserContext } from '../../context/userContext'

interface FormValues {
    email: string
    password: string
}

export const LoginForm: React.FC = () => {
    const { login, apiStatus } = useUserContext()
    const [showPassword, setShowPassword] = React.useState(false)
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

    const handleShowPassword = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ errors, touched }) => (
                        <Form className="bg-neutral p-6 rounded-lg shadow-md flex flex-col items-center">
                            <h2 className="text-lg font-medium mb-4">Log In</h2>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-400 font-medium mb-2"
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

                                        <div className="btn btn-square border-gray-300">
                                            <EmailIcon />
                                        </div>
                                    </div>
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-xs font-medium"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-400 font-medium mb-2"
                                    htmlFor="email">
                                    Password
                                </label>
                                <div className="form-control">
                                    <div className="input-group">
                                        <Field
                                            className={`input input-bordered ${
                                                errors.password &&
                                                touched.password
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            }`}
                                            name="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                        />

                                        <button
                                            onClick={handleShowPassword}
                                            className="btn btn-square border-gray-300">
                                            {showPassword ? (
                                                <EyeSlashedIcon />
                                            ) : (
                                                <EyeIcon />
                                            )}
                                        </button>
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-xs font-medium"
                                    />
                                </div>
                            </div>

                            {isError && (
                                <div className="text-red-500 text-xs font-medium">
                                    {"Error: Couldn't log in"}
                                </div>
                            )}

                            <button
                                className="btn btn-primary w-8/12 mt-4"
                                type="submit"
                                disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Log In'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
