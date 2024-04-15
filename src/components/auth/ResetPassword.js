import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { resetPasswordAsync } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

export default function ResetPassword() {
    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        confirmpassword: Yup.string().required('Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    })
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token')
    const email = query.get('email')

    const dispatch=useDispatch();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmpassword: ''
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(resetPasswordAsync({email, token, password:values.password}))
        },
    })
    return (
        <div>
            {(true) ? <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Enter New Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        noValidate
                        onSubmit={formik.handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    New Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.onBlur}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmpassword"
                                    value={formik.values.confirmpassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.onBlur}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                                    <p className="mt-2 text-sm text-red-500">{formik.errors.confirmpassword}</p>
                                ) : null}

                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Send me back to{' '}
                        <Link
                            to="/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div> : <p>Incorrect Link</p>}
        </div>
    )
};