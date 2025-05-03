import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import eccomLogo from "../../images/Yellow_E-commerce_Shop_Bag_Store_Logo.jpg";
import { logininitialValues, loginvalidationSchema } from '../../constants/formconstants/login';
import { URLS } from '../../constants/urls';
import { postAxiosBaseService } from '../../services/baseService';
import { setUserInfo } from '../../redux/userSlice';

export default function Login() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: logininitialValues,
        validationSchema: loginvalidationSchema,
        onSubmit: async (values) => {

            try {
                const response = await postAxiosBaseService(URLS.LOGIN, values);
               
                if ( response.data?.statusCode === 201) {
                    const token = response?.data?.data.token;
                    dispatch(setUserInfo(response?.data?.data.userWithoutPass));
                    localStorage.setItem('token', token);
                    await navigate("/dashboard/");

                } else {
                    toast.error("Wrong user or password ");
                }
            } catch (error) {}
        }
    });

    return (
        <div className="p-6">
            <div className='bg-white h-full min-h-[calc(100vh-48px)] flex justify-between items-center sm:flex-row flex-col'>
                <div className='w-full'> <img src={eccomLogo} alt='logo' /> </div>
                <div className='w-full flex items-center p-6'>
                    <div className='w-full'>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-0 sm:mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Log in to your account </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form noValidate className="space-y-6" onSubmit={formik.handleSubmit}>
                                <>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900"> Email address</label>
                                    <div className="!mt-2">
                                        <input id="email" name="email" type="email" placeholder='Enter your email' value={formik.values.email} onChange={formik.handleChange} autoComplete="off" required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {formik.touched.email && formik.errors.email && (<p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>)}
                                    </div>
                                </>

                                <>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900"> Password </label>
                                    </div>
                                    <div className="!mt-2">
                                        <input id="password" name="password" type="password" autoComplete="off" placeholder='Enter your password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        {formik.touched.password && formik.errors.password && (<p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>)}
                                    </div>
                                </>

                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Log in</button>
                            </form>

                            <p className="mt-4 text-center text-sm text-gray-500">
                                Not a member?{' '}
                                <Link to={'/signup'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
