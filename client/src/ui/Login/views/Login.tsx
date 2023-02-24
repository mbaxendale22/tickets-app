import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

import { EmailIcon, EyeIcon, EyeSlashedIcon } from '../../../assets/Icons'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
    UserIsErrorSelector,
    UserIsLoadingSelector,
} from '../../../redux/userSlice'
import { loginThunk } from '../../../thunks/loginThunk'

interface FormValues {
    email: string
    password: string
}

export const LoginForm: React.FC = () => {
    const isLoading = useAppSelector(UserIsLoadingSelector)
    const isError = useAppSelector(UserIsErrorSelector).error

    console.log('isError', isError)

    const dispatch = useAppDispatch()
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

    const handleSubmit = (values: FormValues) => {
        const { email, password } = values
        dispatch(loginThunk(email, password))
    }

    const handleShowPassword = (e: any) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    return (
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
                                            errors.password && touched.password
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        name="password"
                                        type={
                                            showPassword ? 'text' : 'password'
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
                                {'Either your email or password is incorrect.'}
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
    )
}
