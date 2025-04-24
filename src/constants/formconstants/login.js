import {object, string ,ref } from 'yup';

export const loginvalidationSchema = object().shape({
    email: string().email('Invalid email address').required('Email is required'),
    password: string().required('Password is required')
});

export const logininitialValues= {
    email: '',
    password: ''
};

export const signUpValidationSchema = object().shape({
    email: string().email('Invalid email address').required('Email is required'),
    password: string().required('Password is required'),
    confirmpassword: string().required('Password is required').oneOf([ref('password'), null], 'Passwords must match'),
})

export const signUpinitialValues= {
    email: '',
    password: '',
    confirmpassword: ''
};