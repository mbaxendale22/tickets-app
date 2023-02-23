import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

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

export const EditTicket = (props: Props) => {
    const {
        title,
        description,
        epic,
        comfort_level,
        learning_outcomes,
        reflections,
        link,
        createdAt,
        updatedAt,
    } = props

    const initialValues: Props = {
        title,
        description,
        epic,
        comfort_level,
        learning_outcomes,
        reflections,
        link,
        createdAt,
        updatedAt,
    }

    // const validationSchema = Yup.object({
    //     email: Yup.string()
    //         .email('Invalid email address')
    //         .required('Email is required'),
    //     password: Yup.string().required('Password is required'),
    // })

    const handleSubmit = (values: Props) => {}
    //! TODO this will be a central modal component which will be used to edit and create tickets
    return (
        <div className="w-full max-w-md">
            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form className="bg-neutral p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-lg font-medium mb-4">Log In</h2>

                        <div className="mb-4">
                            <label
                                className="block text-gray-400 font-medium mb-2"
                                htmlFor="email">
                                Title
                            </label>
                            <div className="form-control">
                                <div className="input-group">
                                    <Field
                                        className={`input input-bordered`}
                                        name="title"
                                        type="text"
                                    />
                                </div>
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-xs font-medium"
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
