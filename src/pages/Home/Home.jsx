import {

    Link

} from 'react-router-dom'

import './Home.css'

function Home() {

    return (

        <div className='home'>
            <section className='hero'>
                <div className='overlay'>
                    <nav className='navbar'>
                        <h1 className='logo'>
                            DreamArena Premier League
                            <span>
                                (DPL)
                            </span>
                        </h1>
                        <div className='nav-links'>
                            <Link to='/login'>
                                Login
                            </Link>
                            <Link
                            to='/register'
                            className='register-btn'
                            >
                                Register Team
                            </Link>
                        </div>
                    </nav>
                    <div className='hero-content'>
                        <h2>

                            Build Your Dream Team.
                            Rule The Auction Arena.

                        </h2>

                        <p>

                        Welcome to the official 

                        <strong>

                            DreamArena Premier League (DPL) 

                        </strong>

                        fantasy auction platform where cricket team managers
                        compete to build the strongest squad within their budget.

                        </p>

                        <div className='hero-buttons'>

                            <Link
                            to='/register'
                            className='primary-btn'
                            >
                                Start Auction
                            </Link>

                            <Link
                            to='/login'
                            className='secondary-btn'
                            >
                                Manager Login
                            </Link>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home