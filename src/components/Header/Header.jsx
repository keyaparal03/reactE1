import {

  useNavigate

} from 'react-router-dom'

import {

  useAuthContext

} from '../../context/AuthContext'

import './Header.css'

function Header({ remainingBudget }) {

  const navigate = useNavigate()

  const {

    user,
    logoutUser

  } = useAuthContext()

  const handleLogout = () => {

    logoutUser()

    navigate('/')
  }

  return (

    <header className='header'>

      <h1 className='logo'>

        DreamArena

      </h1>

      <div className='header-center'>

        <h3>

          Welcome,

          <span>

            {user?.fullName}

          </span>

        </h3>

        <div className='budget-box'>

          Available Balance:

          ₹ {

            remainingBudget.toLocaleString()
          }

        </div>

      </div>

      <button

        className='logout-btn'

        onClick={handleLogout}
      >

        Logout

      </button>

    </header>
  )
}

export default Header