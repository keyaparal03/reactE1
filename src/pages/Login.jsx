import { useFormik } from 'formik'
import * as Yup from 'yup'
import API from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
    const navigate = useNavigate()

    const loginForm = useFormik({

    initialValues: {
        email: '',
        password: ''
    },

    validationSchema: Yup.object({
        email: Yup.string().trim()
        .email('Invalid Email')
        .required('Email Required'),

        password: Yup.string().trim()
        .required('Password Required')
    }),

    onSubmit: async (values) => {

        try {

        const response = await API.post(

            '/auth/login',

            values
        )

        localStorage.setItem(

            'user',

            JSON.stringify(response.data)
        )

        toast.success(
            'Login Successful'
        )

        navigate('/dashboard')

        } catch (error) {

        toast.error(

            error.response?.data?.message ||

            'Invalid Credentials'
        )
        }
    }
    })

    return (

        <div className='container auth-container'>

            <div className='auth-card'>

            <h1 className='logo-text'>
                Login
            </h1>

            <h2>
                
            </h2>

            {/* <p className='subtitle'>
                Login to continue your fantasy journey
            </p> */}

            <form onSubmit={loginForm.handleSubmit}>

                <input
                type='email'
                name='email'
                placeholder='Enter Email'
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                />

                {
                loginForm.touched.email &&
                loginForm.errors.email && (

                    <p className='error'>
                    {loginForm.errors.email}
                    </p>
                )
                }

                <input
                type='password'
                name='password'
                placeholder='Enter Password'
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                />

                {
                loginForm.touched.password &&
                loginForm.errors.password && (

                    <p className='error'>
                    {loginForm.errors.password}
                    </p>
                )
                }

                <button
                type='submit'
                className='auth-btn'
                >

                Login

                </button>

            </form>

            <p className='auth-link'>

                Don't have an account ?

                <Link to='/register'>

                Register

                </Link>

            </p>

            </div>

        </div>
    )
}

export default Login