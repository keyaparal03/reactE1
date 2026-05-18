import {

  Link,
  useNavigate

} from 'react-router-dom'

function Header({

  remainingBudget

}) {

  const navigate = useNavigate()

  const user = JSON.parse(

    localStorage.getItem('user')
  )

  const handleLogout = () => {

    localStorage.removeItem('user')

    navigate('/')
  }

  return (

    <header className='header'>

      {/* LOGO */}

      <div className='logo'>

        DreamArena

      </div>

      {/* NAVIGATION */}

      <nav className='nav-links'>

        <Link to='/dashboard'>

          Dashboard

        </Link>

        <Link to='/profile'>

          Profile

        </Link>

      </nav>

      {/* BUDGET */}

      <div className='budget-box'>

        Budget Left:
        ₹ {(remainingBudget / 10000000).toFixed(2)} Cr

      </div>

      {/* USER */}

      <div className='user-section'>

        <span>

          {user.teamName}

        </span>

        <button
          onClick={handleLogout}
        >

          Logout1

        </button>

      </div>

    </header>
  )
}

export default Header