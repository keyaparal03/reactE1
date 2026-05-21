import {

  useNavigate

} from 'react-router-dom'

import './Header.css'

function Header({

  remainingBudget

}) {

  const navigate = useNavigate()

  const user = JSON.parse(

    localStorage.getItem('user')
  )

  // LOGOUT

  const logoutHandler = () => {

    localStorage.removeItem('user')

    navigate('/login')
  }

  return (

    <header className='main-header'>

      {/* LEFT */}

      <h1 className='logo'>

        DreamArena

      </h1>

      {/* CENTER */}

      <div className='header-center'>

        <h3 className='welcome-text'>

          Welcome,

          {' '}

          {user?.fullName}
        </h3>

        <div className='budget-box'>

          Available Balance:

          {' '}

          ₹ {

            (
              remainingBudget /

              10000000
            ).toFixed(2)

          } Cr

        </div>

      </div>

      {/* RIGHT */}

      <div className='header-right'>

        <h3 className='team-name'>

          {user?.teamName}
        </h3>

        <button

          className='logout-btn'

          onClick={logoutHandler}
        >

          Logout

        </button>

      </div>

    </header>
  )
}

export default Header