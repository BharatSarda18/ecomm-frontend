import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createUserAsync } from '../../redux/authSlice';
import eccomLogo from "../../images/Yellow_E-commerce_Shop_Bag_Store_Logo.jpg";
import { signUpinitialValues, signUpValidationSchema } from '../../constants/formconstants/login';

export default function SignUp() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: signUpinitialValues,
        validationSchema: signUpValidationSchema,
        onSubmit: async (values) => {
            const response = await dispatch(createUserAsync({ email: values.email, password: values.password, role: 'user' }));

            if (response?.payload?.statusCode === 201) {
                await navigate("/dashboard/");
            }
        },
    });

    useEffect(() => {
        localStorage.clear();
    }, [])

    return (
        <div className="p-6">
            <div className='h-full min-h-[calc(100vh-48px)] bg-white flex justify-between sm:flex-row flex-col'>
                <div className='w-full sm:w-1/2'><img src={eccomLogo} alt='logo' /> </div>

                <div className='w-full sm:w-1/2 p-6'>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-0 sm:mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-3" onSubmit={formik.handleSubmit}>
                            <>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900"> Email address</label>
                                <div>
                                    <input id="email" name="email" type="email" autoComplete="off" placeholder='Enter your email' required value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    {formik.touched.email && formik.errors.email && (<p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>)}
                                </div>
                            </>

                            <>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div>
                                    <input id="password" name="password" type="password" autoComplete="off" placeholder='Enter your password' required value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    {formik.touched.password && formik.errors.password && (<p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>)}
                                </div>
                            </>

                            <>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
                                <div>
                                    <input id="confirmpassword" name="confirmpassword" type="password" placeholder='Enter your password' autoComplete="off" required value={formik.values.confirmpassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    {formik.touched.confirmpassword && formik.errors.confirmpassword && (<p className="mt-1 text-sm text-red-500">{formik.errors.confirmpassword}</p>)}
                                </div>
                            </>

                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Sign up</button>

                        </form>

                        <p className="mt-4 text-center text-sm text-gray-500">
                            Already a member?{' '}
                            <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Log in your account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};
