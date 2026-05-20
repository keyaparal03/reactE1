import {

  Link

} from 'react-router-dom'

import './Home.css'

function Home() {

  return (

    <div className='home'>

      {/* HERO SECTION */}

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

      {/* ABOUT */}

      <section className='about'>

        <div className='container'>

          <h2>

            About DPL Auction
          </h2>

          <p>

            DreamArena Premier League (DPL) is a professional
            fantasy cricket auction system where registered
            managers purchase players using a fixed team budget.

          </p>

          <div className='about-grid'>

            <div className='about-card'>

              <h3>

                Live Player Auction
              </h3>

              <p>

                Buy top cricket players for your squad
                while managing your remaining budget smartly.

              </p>

            </div>

            <div className='about-card'>

              <h3>

                Team Management
              </h3>

              <p>

                Create your own team, manage your squad,
                and build the perfect playing combination.

              </p>

            </div>

            <div className='about-card'>

              <h3>

                Smart Budget System
              </h3>

              <p>

                Every manager gets a fixed budget.
                Players can only be purchased within
                the available balance.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* RULES */}

      <section className='rules'>

        <div className='container'>

          <h2>

            League Rules & Fair Play
          </h2>

          <div className='rules-grid'>

            <div className='rule-box'>

              <h3>

                One Team = One Manager
              </h3>

              <p>

                The same team name cannot be registered
                by multiple managers in the system.

              </p>

            </div>

            <div className='rule-box'>

              <h3>

                Unique Player Ownership
              </h3>

              <p>

                Once a player is purchased by a manager,
                the player becomes globally sold and
                unavailable for others.

              </p>

            </div>

            <div className='rule-box'>

              <h3>

                Secure Manager Login
              </h3>

              <p>

                Registered managers can securely login
                and manage their own team independently.

              </p>

            </div>

            <div className='rule-box'>

              <h3>

                Create Your Own Squad
              </h3>

              <p>

                Every manager can create a unique team
                strategy using batters, bowlers,
                wicket keepers, and all-rounders.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className='features'>

        <div className='container'>

          <h2>

            Why Choose DPL?
          </h2>

          <div className='feature-list'>

            <div className='feature-item'>

              <span>

                🏏
              </span>

              <p>

                Professional cricket auction experience

              </p>

            </div>

            <div className='feature-item'>

              <span>

                💰
              </span>

              <p>

                Real-time budget tracking

              </p>

            </div>

            <div className='feature-item'>

              <span>

                👥
              </span>

              <p>

                Manager-based secure authentication

              </p>

            </div>

            <div className='feature-item'>

              <span>

                📊
              </span>

              <p>

                Detailed player information and statistics

              </p>

            </div>

            <div className='feature-item'>

              <span>

                🔒
              </span>

              <p>

                Protected routes and secure access

              </p>

            </div>

            <div className='feature-item'>

              <span>

                ⚡
              </span>

              <p>

                Fast and modern React experience

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className='cta'>

        <div className='container'>

          <h2>

            Ready To Become A Champion Manager?
          </h2>

          <p>

            Register your team today and start building
            your ultimate DPL squad.

          </p>

          <Link
            to='/register'
            className='cta-btn'
          >

            Register Now

          </Link>

        </div>

      </section>

    </div>
  )
}

export default Home