import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../../services/api'
import './Register.css'

function Register() {

const navigate = useNavigate()

  const registerForm = useFormik({

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

    .min(

      3,

      'Please enter your full name (min 3 characters).'
    )

    .required(

      'Please enter your full name.'
    ),

  email: Yup.string()

    .email(

      'Please enter a valid email address.'
    )

    .required(

      'Please enter your email.'
    ),

  password: Yup.string()

    .matches(

      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,

      'Password must be at least 8 characters and include upper, lower, and a number.'
    )

    .required(

      'Please enter your password.'
    ),

  confirmPassword: Yup.string()

    .oneOf(

      [Yup.ref('password')],

      'Passwords do not match.'
    )

    .required(

      'Please confirm your password.'
    ),

  teamName: Yup.string()

    .min(

      2,

      'Please enter a team name (min 2 characters).'
    )

    .required(

      'Please enter your team name.'
    ),

  budget: Yup.number()

    .required(

      'Please set your starting budget.'
    )

    .min(

      100000,

      'Budget must be between ₹1,00,000 and ₹10,00,00,000.'
    )

    .max(

      1000000000,

      'Budget must be between ₹1,00,000 and ₹10,00,00,000.'
    )

    .typeError(

      'Please enter a valid budget.'
    )
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

        navigate('/login')

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          'Registration Failed'
        )
      }
    }
})

return (

  <div className='register-container'>

    <div className='register-box'>

      <h1>
        DreamArena Register
      </h1>

      <form
        onSubmit={
          registerForm.handleSubmit
        }
      >

        <input
          type='text'
          name='fullName'
          placeholder='Full Name'
          value={
            registerForm.values.fullName
          }
          onChange={
            registerForm.handleChange
          }
        />

        {

          registerForm.touched.fullName &&

          registerForm.errors.fullName && (

            <p className='error'>

              {
                registerForm.errors.fullName
              }

            </p>
          )
        }

        <input
          type='email'
          name='email'
          placeholder='Email'
          value={
            registerForm.values.email
          }
          onChange={
            registerForm.handleChange
          }
        />

        {

          registerForm.touched.email &&

          registerForm.errors.email && (

            <p className='error'>

              {
                registerForm.errors.email
              }

            </p>
          )
        }

        <input
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='new-password'
          value={
            registerForm.values.password
          }
          onChange={
            registerForm.handleChange
          }
        />

        {

          registerForm.touched.password &&

          registerForm.errors.password && (

            <p className='error'>

              {
                registerForm.errors.password
              }

            </p>
          )
        }

        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          autoComplete='new-password'
          value={
            registerForm.values.confirmPassword
          }
          onChange={
            registerForm.handleChange
          }
        />

        {

          registerForm.touched.confirmPassword &&

          registerForm.errors.confirmPassword && (

            <p className='error'>

              {
                registerForm.errors.confirmPassword
              }

            </p>
          )
        }

        <input
          type='text'
          name='teamName'
          placeholder='Team Name'
          value={
            registerForm.values.teamName
          }
          onChange={
            registerForm.handleChange
          }
        />

        {

          registerForm.touched.teamName &&

          registerForm.errors.teamName && (

            <p className='error'>

              {
                registerForm.errors.teamName
              }

            </p>
          )
        }

        <input
          type='number'
          name='budget'
          placeholder='Budget'
          value={
            registerForm.values.budget
          }
          onChange={
            registerForm.handleChange
          }
        />

        {

          registerForm.touched.budget &&

          registerForm.errors.budget && (

            <p className='error'>

              {
                registerForm.errors.budget
              }

            </p>
          )
        }

        <button type='submit'>

          Register

        </button>

      </form>

      <div className='login-link'>

        <Link to='/'>

          Already Have Account?

        </Link>

      </div>

    </div>

  </div>
)
}

export default Register