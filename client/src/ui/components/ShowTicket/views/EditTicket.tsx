import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

import { InfoIcon } from '../../../../assets/Icons'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import type { Ticket } from '../../../../redux/ticketSlice'
import {
    TicketIsLoadingSelector,
    viewTicketSelector,
} from '../../../../redux/ticketSlice'
import { updateTicketThunk } from '../../../../thunks/updateTicketThunk'
import { Nav } from '../../Nav'

type Props = {
    id: number | null
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

export const EditTicket = () => {
    const isLoading = useAppSelector(TicketIsLoadingSelector)
    const ticket = useAppSelector(viewTicketSelector)
    const dispatch = useAppDispatch()

    if (ticket === null) {
        return null
    }
    const {
        id,
        title,
        description,
        epic,
        comfort_level,
        learning_outcomes,
        reflections,
        link,
        createdAt,
        updatedAt,
    } = ticket

    const initialValues: Props = {
        id,
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

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().optional(),
        epic: Yup.string().optional(),
        learning_outcome: Yup.string().optional(),
        reflections: Yup.string().optional(),
        comfort_level: Yup.number().optional().min(1).max(10),
        link: Yup.string().optional(),
    })

    const handleSubmit = (values: Props) => {
        if (!id) {
            return
        }
        dispatch(updateTicketThunk(id, values))
    }
    //! TODO this will be a central modal component which will be used to edit and create tickets
    return (
        <div className="w-full flex flex-col justify-center items-center pt-12 pb-24">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form className="bg-neutral p-6 rounded-lg shadow-md flex flex-col justify-center items-center w-3/4">
                        <h2 className="text-lg font-medium mb-4">
                            Edit Ticket
                        </h2>

                        <div className="mb-4 w-3/4 flex flex-col justify-center items-center">
                            <div className=" flex w-3/4 mb-2">
                                <div className="w-1/3"></div>
                                <label
                                    className="flex justify-center items-center text-gray-400 font-medium w-1/3"
                                    htmlFor="title">
                                    Title
                                </label>

                                <div
                                    className="w-1/3 flex justify-end items-center tooltip"
                                    data-tip="You must provide a title for the ticket">
                                    <InfoIcon />
                                </div>
                            </div>

                            <div className="form-control w-3/4">
                                <div className="input-group">
                                    <Field
                                        className={`input input-bordered w-full ${
                                            errors.title && touched.title
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        name="title"
                                        type="text"
                                    />
                                </div>
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="text-red-500 text-xs font-medium"
                                />
                            </div>
                        </div>

                        <div className="mb-4 w-3/4 flex flex-col justify-center items-center">
                            <div className=" flex w-3/4 mb-2">
                                <div className="w-1/3"></div>
                                <label
                                    className="flex justify-center items-center text-gray-400 font-medium w-1/3"
                                    htmlFor="description">
                                    Description
                                </label>

                                <div
                                    className="w-1/3 flex justify-end items-center tooltip"
                                    data-tip="How would you summarise the task you tackled?">
                                    <InfoIcon />
                                </div>
                            </div>

                            <div className="form-control w-3/4">
                                <div className="input-group">
                                    <Field
                                        as="textarea"
                                        className={`input input-bordered w-full ${
                                            errors.description &&
                                            touched.description
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        name="description"
                                        type="text"
                                    />
                                </div>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-red-500 text-xs font-medium"
                                />
                            </div>
                        </div>

                        <div className="mb-4 w-3/4 flex flex-col justify-center items-center">
                            <div className=" flex w-3/4 mb-2">
                                <div className="w-1/3"></div>
                                <label
                                    className="flex justify-center items-center text-gray-400 font-medium w-1/3"
                                    htmlFor="epic">
                                    Epic
                                </label>

                                <div
                                    className="w-1/3 flex justify-end items-center tooltip"
                                    data-tip="You can use Epics to link tickets together and search for them later">
                                    <InfoIcon />
                                </div>
                            </div>

                            <div className="form-control w-3/4">
                                <div className="input-group">
                                    <Field
                                        className={`input input-bordered w-full ${
                                            errors.epic && touched.epic
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        name="epic"
                                        type="text"
                                    />
                                </div>
                                <ErrorMessage
                                    name="epic"
                                    component="div"
                                    className="text-red-500 text-xs font-medium"
                                />
                            </div>
                        </div>

                        <div className="mb-4 w-3/4 flex flex-col justify-center items-center">
                            <div className=" flex w-3/4 mb-2">
                                <div className="w-1/3"></div>
                                <label
                                    className="flex justify-center items-center text-gray-400 font-medium w-1/3"
                                    htmlFor="learning_outcomes">
                                    Learning Outcomes
                                </label>

                                <div
                                    className="w-1/3 flex justify-end items-center tooltip"
                                    data-tip="What were your main learning outcomes from this task?">
                                    <InfoIcon />
                                </div>
                            </div>

                            <div className="form-control w-3/4">
                                <div className="input-group">
                                    <Field
                                        as="textarea"
                                        className={`input input-bordered w-full ${
                                            errors.learning_outcomes &&
                                            touched.learning_outcomes
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        name="learning_outcomes"
                                        type="text"
                                    />
                                </div>
                                <ErrorMessage
                                    name="learning_outcomes"
                                    component="div"
                                    className="text-red-500 text-xs font-medium"
                                />
                            </div>
                        </div>

                        <div className="mb-4 w-3/4 flex flex-col justify-center items-center">
                            <div className=" flex w-3/4 mb-2">
                                <div className="w-1/3"></div>
                                <label
                                    className="flex justify-center items-center text-gray-400 font-medium w-1/3"
                                    htmlFor="comfort_level">
                                    Comfort Level
                                </label>

                                <div
                                    className="w-1/3 flex justify-end items-center tooltip"
                                    data-tip="On a scale of 1 to 10, how challenging was this task?">
                                    <InfoIcon />
                                </div>
                            </div>

                            <div className="form-control w-3/4">
                                <div className="input-group">
                                    <Field
                                        className={`input input-bordered w-full ${
                                            errors.comfort_level &&
                                            touched.comfort_level
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        name="comfort_level"
                                        type="text"
                                    />
                                </div>
                                <ErrorMessage
                                    name="comfort_level"
                                    component="div"
                                    className="text-red-500 text-xs font-medium"
                                    render={() => (
                                        <div className="text-red-500 text-xs font-medium">
                                            Comfort Level must between 1 and 10
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="mb-4 w-3/4 flex flex-col justify-center items-center">
                            <div className=" flex w-3/4 mb-2">
                                <div className="w-1/3"></div>
                                <label
                                    className="flex justify-center items-center text-gray-400 font-medium w-1/3"
                                    htmlFor="reflections">
                                    Reflections
                                </label>

                                <div
                                    className="w-1/3 flex justify-end items-center tooltip"
                                    data-tip="This is just a space for any other thoughts or reflections on the task">
                                    <InfoIcon />
                                </div>
                            </div>

                            <div className="form-control w-3/4">
                                <div className="input-group">
                                    <Field
                                        as="textarea"
                                        className={`input input-bordered w-full ${
                                            errors.reflections &&
                                            touched.reflections
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        name="reflections"
                                        type="text"
                                    />
                                </div>
                                <ErrorMessage
                                    name="reflections"
                                    component="div"
                                    className="text-red-500 text-xs font-medium"
                                />
                            </div>
                        </div>

                        <div className="mb-4 w-3/4 flex flex-col justify-center items-center">
                            <div className=" flex w-3/4 mb-2">
                                <div className="w-1/3"></div>
                                <label
                                    className="flex justify-center items-center text-gray-400 font-medium w-1/3"
                                    htmlFor="links">
                                    Links
                                </label>

                                <div
                                    className="w-1/3 flex justify-end items-center tooltip"
                                    data-tip="If there's a relevant link to the work or any other outcomes, pop it in here for future reference">
                                    <InfoIcon />
                                </div>
                            </div>

                            <div className="form-control w-3/4">
                                <div className="input-group">
                                    <Field
                                        className={`input input-bordered w-full ${
                                            errors.link && touched.link
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        name="link"
                                        type="text"
                                    />
                                </div>
                                <ErrorMessage
                                    name="link"
                                    component="div"
                                    className="text-red-500 text-xs font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center w-full sm:w-1/2 mt-4">
                            <button
                                className="btn btn-primary w-[45%] mr-1"
                                type="submit"
                                disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Save'}
                            </button>

                            <button
                                className="btn btn-error w-[45%] ml-1"
                                type="submit"
                                disabled={isLoading}>
                                {'Cancel'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <Nav />
        </div>
    )
}
