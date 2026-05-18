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

      <div className='logo'>

        DreamArena

      </div>

      <div className='budget-box'>

        Budget Left:

        ₹ {(remainingBudget / 10000000).toFixed(2)} Cr

      </div>

      <div className='user-section'>

        <span>
          {user?.teamName}
        </span>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </header>
  )
}

export default Header