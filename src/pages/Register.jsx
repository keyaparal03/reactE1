import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../services/api'

function Register() {

    const navigate = useNavigate()

    const regForm = useFormik({

        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            teamName: '',
            budget: ''
        },

        validationSchema: Yup.object({
            fullName: Yup.string()
            .trim()
            .min(3, 'Minimum 3 characters')
            .required('Full Name Required'),

            email: Yup.string()
            .trim()
            .email('Invalid Email')
            .required('Email Required')
            .test(
                'uniqueEmail',
                'Email already exists',

                async function (value) {

                    if (!value) return true

                    try {

                        const response = await API.post(
                        '/auth/check-email',
                        { email: value }
                        )

                        return response.data.success

                    } catch (error) {
                        console.log(error)
                        return false
                    }
                }
            ),

            password: Yup.string()
            .trim()
            .min(6, 'Minimum 8 characters')
            .required('Password Required'),

            confirmPassword: Yup.string()
            .required('Confirm Password Required')
            .oneOf(
                [Yup.ref('password')],
                'Passwords must match'
            ),

            teamName: Yup.string()
            .trim()
            .required('Team Name Required'),

            budget: Yup.number()
            .transform((value, originalValue) =>
                originalValue === ''
                ? undefined
                : value
            )
            .required('Budget Required')
            .typeError('Budget must be a number')
        }),

        onSubmit: async (values) => {

            try {

            await API.post(
                '/auth/register',
                values
            )

            toast.success(
                'Registration Successful'
            )

            navigate('/')

            } catch (error) {

            toast.error(

                error.response?.data?.message ||

                'Something went wrong'
            )
            }
        }
    })

    return (

        <div className='container'>
            <h2>Register</h2>

            <form onSubmit={regForm.handleSubmit}>

            <input
                type='text'
                name='fullName'
                placeholder='Full Name'
                value={regForm.values.fullName}
                onChange={regForm.handleChange}
                onBlur={regForm.handleBlur}
            />

            {
                regForm.touched.fullName &&
                regForm.errors.fullName && (

                <p className='error'>
                    {regForm.errors.fullName}
                </p>
                )
            }

            <input
                type='email'
                name='email'
                placeholder='Email'
                value={regForm.values.email}
                onChange={regForm.handleChange}
                onBlur={regForm.handleBlur}
            />

            {
                regForm.touched.email &&
                regForm.errors.email && (

                <p className='error'>
                    {regForm.errors.email}
                </p>
                )
            }

            <input
                type='password'
                name='password'
                placeholder='Password'
                value={regForm.values.password}
                onChange={regForm.handleChange}
                onBlur={regForm.handleBlur}
            />

            {
                regForm.touched.password &&
                regForm.errors.password && (

                <p className='error'>
                    {regForm.errors.password}
                </p>
                )
            }

            <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                value={regForm.values.confirmPassword}
                onChange={regForm.handleChange}
                onBlur={regForm.handleBlur}
                autoComplete='new-password'
            />

            {
                regForm.touched.confirmPassword &&
                regForm.errors.confirmPassword && (
                    <p className='error'>
                    {regForm.errors.confirmPassword}
                    </p>
                )
            }

            <input
                type='text'
                name='teamName'
                placeholder='Team Name'
                value={regForm.values.teamName}
                onChange={regForm.handleChange}
                onBlur={regForm.handleBlur}
            />

            {
                regForm.touched.teamName &&
                regForm.errors.teamName && (
                    <p className='error'>
                        {regForm.errors.teamName}
                    </p>
                )
            }

            <input
                type='text'
                name='budget'
                placeholder='Budget'
                value={regForm.values.budget}
                onChange={regForm.handleChange}
                onBlur={regForm.handleBlur}
            />

            {
                regForm.touched.budget &&
                regForm.errors.budget && (
                    <p className='error'>
                        {regForm.errors.budget}
                    </p>
                )
            }

            <button type='submit'>Register </button>

            </form>

        </div>
    )
}

export default Register