import { useFormik } from 'formik'

import * as Yup from 'yup'

import {

  Link,
  useNavigate

} from 'react-router-dom'

import {

  toast

} from 'react-toastify'

import API from '../../services/api'

import {

  useAuthContext

} from '../../context/AuthContext'

import './Login.css'

function Login() {

  const navigate = useNavigate()

  const {

    loginUser

  } = useAuthContext()

  const loginForm = useFormik({

    initialValues: {

      email: '',

      password: ''
    },

    validationSchema: Yup.object({

      email: Yup.string()

        .email('Invalid Email')

        .required('Email Required'),

      password: Yup.string()

        .required('Password Required')
    }),

    onSubmit: async (values) => {

      try {

        const response = await API.post(

          '/auth/login',

          values
        )

        loginUser(
          response.data
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

    <div className='login-container'>

      <div className='login-box'>

        <h1>
          DreamArena Login
        </h1>

        <form
          onSubmit={
            loginForm.handleSubmit
          }
        >

          <input
            type='email'
            name='email'
            placeholder='Enter Email'
            value={
              loginForm.values.email
            }
            onChange={
              loginForm.handleChange
            }
          />

          {

            loginForm.touched.email &&

            loginForm.errors.email && (

              <p className='error'>

                {
                  loginForm.errors.email
                }

              </p>
            )
          }

          <input
            type='password'
            name='password'
            placeholder='Enter Password'
            autoComplete='current-password'
            value={
              loginForm.values.password
            }
            onChange={
              loginForm.handleChange
            }
          />

          {

            loginForm.touched.password &&

            loginForm.errors.password && (

              <p className='error'>

                {
                  loginForm.errors.password
                }

              </p>
            )
          }

          <button type='submit'>

            Login

          </button>

        </form>

        <div className='register-link'>

          <Link to='/register'>

            Create Account

          </Link>

        </div>

      </div>

    </div>
  )
}

export default Login