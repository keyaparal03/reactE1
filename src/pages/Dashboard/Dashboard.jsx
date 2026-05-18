import Header from '../../components/Header/Header'

import {

  usePlayerContext

} from '../../context/PlayerContext'

import {

  useAuthContext

} from '../../context/AuthContext'

import {

  GiCricketBat,
  GiBaseballGlove,
  GiTennisBall

} from 'react-icons/gi'

import './Dashboard.css'

function Dashboard() {

  const {

    players,
    myTeam,
    addPlayer,
    removePlayer

  } = usePlayerContext()

  const {

    user

  } = useAuthContext()

  const totalSpent = myTeam.reduce(

    (total, item) =>

      total + item.price,

    0
  )

  const remainingBudget =

    Number(user.budget) -

    totalSpent

  // ROLE ICONS

const getRoleIcon = (role) => {

  switch(role){

    case 'Batter':

      return <GiCricketBat />

    case 'Bowler':

      return <GiTennisBall />

    case 'Wicket Keeper':

      return <GiBaseballGlove />

    case 'All Rounder':

      return (

        <div className='all-rounder-icon'>

          <GiCricketBat />

          <GiTennisBall />

        </div>
      )

    default:

      return <GiCricketBat />
  }
}

  // GROUP PLAYERS

  const groupedPlayers = {

    Batter: players.filter(
      player => player.role === 'Batter'
    ),

    Bowler: players.filter(
      player => player.role === 'Bowler'
    ),

    'Wicket Keeper': players.filter(
      player => player.role === 'Wicket Keeper'
    ),

    'All Rounder': players.filter(
      player => player.role === 'All Rounder'
    )
  }

  return (

    <>

      <Header
        remainingBudget={
          remainingBudget
        }
      />

      <div className='dashboard-container'>

        {/* LEFT */}

        <div className='available-section'>

          <h1 className='section-title'>

            Available Players

          </h1>

          {

            Object.keys(groupedPlayers).map(role => (

              <div key={role}>

                <h2 className='role-title'>

                  {role}

                </h2>

                <div className='player-grid'>

                  {

                    groupedPlayers[role].map(player => (

                      <div
                        key={player._id}
                        className='player-card'
                      >

                        <div className='player-icon'>

                          {getRoleIcon(player.role)}

                        </div>

                        <div className='player-info'>

                          <h4>

                            {player.name}

                          </h4>

                          <p>

                            {player.country}

                          </p>

                          <p className='price'>

                            ₹ {

                              (
                                player.price /

                                10000000

                              ).toFixed(2)

                            } Cr

                          </p>

                        </div>

                        <button
                          onClick={() =>
                            addPlayer(player)
                          }
                        >

                          Add Player

                        </button>

                      </div>
                    ))
                  }

                </div>

              </div>
            ))
          }

        </div>

        {/* RIGHT */}

        <div className='team-section'>

          <h1 className='section-title'>

            My Team ({myTeam.length}/15)

          </h1>

          {

            myTeam.length === 0 ? (

              <p className='empty-team'>

                No Players Added

              </p>

            ) : (

              <div className='team-grid'>

                {

                  myTeam.map(player => (

                    <div
                      key={player._id}
                      className='team-card'
                    >

                      <div className='player-icon'>

                        {getRoleIcon(player.role)}

                      </div>

                      <div className='player-info'>

                        <h4>

                          {player.name}

                        </h4>

                        <p>

                          {player.role}

                        </p>

                        <p className='price'>

                          ₹ {

                            (
                              player.price /

                              10000000

                            ).toFixed(2)

                          } Cr

                        </p>

                      </div>

                      <button
                        onClick={() =>
                          removePlayer(player._id)
                        }
                      >

                        Remove

                      </button>

                    </div>
                  ))
                }

              </div>
            )
          }

        </div>

      </div>

    </>
  )
}

export default Dashboard