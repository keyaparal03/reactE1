import {

  useFormik

} from 'formik'

import * as Yup from 'yup'

import {

  Link,
  useNavigate

} from 'react-router-dom'

import {

  toast

} from 'react-toastify'

import API from '../../services/api'

import './Login.css'

function Login() {

  const navigate = useNavigate()

  const loginForm = useFormik({

    initialValues: {

      email:'',
      password:''
    },

    validationSchema: Yup.object({

      email: Yup.string()

        .email(

          'Please enter a valid email.'
        )

        .required(

          'Please enter your email.'
        ),

      password: Yup.string()

        .required(

          'Please enter your password.'
        )
    }),

    onSubmit: async (values) => {

      try {

        const response = await API.post(

          '/auth/login',

          values
        )

        console.log(response.data)

        // SAVE USER

        localStorage.setItem(

          'user',

          JSON.stringify(
            response.data
          )
        )

        toast.success(

          'Login Successful'
        )

        // REDIRECT

        navigate('/dashboard')

      } catch(error){

        console.log(error)

        toast.error(

          error.response?.data?.message ||

          'Incorrect email or password.'
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
            placeholder='Email'
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
            placeholder='Password'
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