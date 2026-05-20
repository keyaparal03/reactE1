import Header from '../../components/Header/Header'

import {

  usePlayerContext

} from '../../context/PlayerContext'

import {

  useAuthContext

} from '../../context/AuthContext'

import {

  Link

} from 'react-router-dom'

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

  // TOTAL SPENT

  const totalSpent = myTeam.reduce(

    (total, item) =>

      total + item.price,

    0
  )

  // REMAINING BUDGET

  const remainingBudget =

    Number(user?.budget || 0)

    -

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

        {/* LEFT SIDE */}

        <div className='available-section'>

          <h1 className='section-title'>

            IPL Auction Players

          </h1>

          {

            Object.keys(groupedPlayers).map(role => (

              <div key={role}>

                <h2 className='role-title'>

                  {role}

                </h2>

                <div className='player-grid'>

                  {

                    groupedPlayers[role].map(player => {

                      // CURRENT USER PLAYER

                      const isCurrentUserPlayer =

                        myTeam.some(

                          item =>

                            String(item._id)

                            ===

                            String(player._id)
                        )

                      // SOLD TO OTHER USER

                      const isSoldToOtherUser =

                        player.sold &&

                        String(player.soldTo)

                        !==

                        String(user._id)

                      return (

                        <div

                          key={player._id}

                          className={

                            player.sold

                              ? 'player-card sold-player'

                              : 'player-card'
                          }
                        >

                          {/* ICON */}

                          <div className='player-icon'>

                            {

                              getRoleIcon(
                                player.role
                              )
                            }

                          </div>

                          {/* PLAYER INFO */}

                          <div className='player-info'>

                            <Link

                              to={`/player/${player._id}`}

                              className='player-link'
                            >

                              {player.name}

                            </Link>

                            <p className='player-country'>

                              {player.country}

                            </p>

                            {/* PLAYER TYPE */}

                            <p className='player-type'>

                              {player.playerType}

                            </p>

                            {/* RATING + CATEGORY */}

                            <div className='player-meta'>

                              <span className='rating'>

                                ⭐ {player.overallRating}
                              </span>

                              <span className='category'>

                                {player.category}
                              </span>

                            </div>

                            {/* PRICE */}

                            <p className='price'>

                              ₹ {

                                (
                                  player.price /

                                  10000000
                                ).toFixed(2)

                              } Cr

                            </p>

                            {/* SOLD TEAM */}

                            {

                              player.sold &&

                              player.soldTeamName &&

                              isSoldToOtherUser && (

                                <div className='sold-info'>

                                  <p className='sold-text'>

                                    SOLD TO

                                  </p>

                                  <p className='sold-team-name'>

                                    {

                                      player.soldTeamName
                                    }

                                  </p>

                                </div>
                              )
                            }

                          </div>

                          {/* BUTTON */}

                          <button

                            disabled={

                              isSoldToOtherUser ||

                              isCurrentUserPlayer
                            }

                            onClick={() =>
                              addPlayer(player)
                            }
                          >

                            {

                              player.sold

                                ? 'Sold'

                                : 'Buy Player'
                            }

                          </button>

                        </div>
                      )
                    })
                  }

                </div>

              </div>
            ))
          }

        </div>

        {/* RIGHT SIDE */}

        <div className='team-section'>

          <h1 className='section-title'>

            My Squad ({myTeam.length}/15)

          </h1>

          {

            myTeam.length === 0 ? (

              <p className='empty-team'>

                No Players Purchased

              </p>

            ) : (

              <div className='team-grid'>

                {

                  myTeam.map(player => (

                    <div

                      key={player._id}

                      className='team-card'
                    >

                      {/* ICON */}

                      <div className='player-icon'>

                        {

                          getRoleIcon(
                            player.role
                          )
                        }

                      </div>

                      {/* INFO */}

                      <div className='player-info'>

                        <Link

                          to={`/player/${player._id}`}

                          className='player-link'
                        >

                          {player.name}

                        </Link>

                        <p className='player-type'>

                          {player.playerType}

                        </p>

                        <div className='player-meta'>

                          <span className='rating'>

                            ⭐ {player.overallRating}
                          </span>

                          <span className='category'>

                            {player.category}
                          </span>

                        </div>

                        <p className='price'>

                          ₹ {

                            (
                              player.price /

                              10000000
                            ).toFixed(2)

                          } Cr

                        </p>

                      </div>

                      {/* REMOVE */}

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