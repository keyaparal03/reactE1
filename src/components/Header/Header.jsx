import {

  useNavigate

} from 'react-router-dom'

import {

  useAuthContext

} from '../../context/AuthContext'

import './Header.css'

function Header({

  remainingBudget
}) {

  const navigate = useNavigate()

  const {

    user,
    logout

  } = useAuthContext()

  // LOGOUT

  const handleLogout = () => {

    logout()

    navigate('/')
  }

  return (

    <header className='header'>

      {/* LOGO */}

      <h1 className='logo'>

        DreamArena

      </h1>

      {/* BUDGET */}

      <div className='budget-box'>

        Budget Left:

        ₹ {

          (
            remainingBudget /

            10000000
          ).toFixed(2)

        } Cr

      </div>

      {/* RIGHT SECTION */}

      <div className='header-right'>

        <h3 className='team-name'>

          {

            user?.teamName
          }

        </h3>

        <button

          onClick={handleLogout}

          className='logout-btn'
        >

          Logout

        </button>

      </div>

    </header>
  )
}

export default Header