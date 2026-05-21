import {

  useEffect,
  useState

} from 'react'

import {

  Link

} from 'react-router-dom'

import {

  toast

} from 'react-toastify'

import API from '../../services/api'

import Header from '../../components/Header/Header'

import './Dashboard.css'

function Dashboard() {

  const [players, setPlayers] = useState([])

  const [myTeam, setMyTeam] = useState([])

  const [loading, setLoading] = useState(true)

  // USER

  const user = JSON.parse(

    localStorage.getItem('user')
  )

  // LOAD DATA

  useEffect(() => {

    fetchPlayers()

    fetchMyTeam()

  }, [])

  // FETCH PLAYERS

  const fetchPlayers = async () => {

    try {

      const response = await API.get(

        '/players'
      )

      setPlayers(response.data)

    } catch(error){

      console.log(error)

      toast.error(

        'Failed to load players'
      )
    }
  }

  // FETCH TEAM

  const fetchMyTeam = async () => {

    try {

      const response = await API.get(

        `/team/${user._id}`
      )

      if(response.data){

        setMyTeam(

          response.data.players || []
        )
      }

    } catch(error){

      console.log(error)
    }

    setLoading(false)
  }

  // BUY PLAYER

  const buyPlayer = async (player) => {

    // ALREADY EXISTS

    const exists = myTeam.find(

      item => item._id === player._id
    )

    if(exists){

      return toast.error(

        'This player is already in your team.'
      )
    }

    // TEAM LIMIT

    if(myTeam.length >= 15){

      return toast.error(

        'Team is full (max 15 players).'
      )
    }

    // BUDGET

    if(remainingBudget < player.price){

      return toast.error(

        `Insufficient budget to buy ${player.name}`
      )
    }

    try {

      const updatedTeam = [

        ...myTeam,

        player
      ]

      // SAVE TEAM

      await API.post(

        '/team/save',

        {

          userId:user._id,

          players:updatedTeam.map(

            item => item._id
          )
        }
      )

      // UPDATE UI

      setMyTeam(updatedTeam)

      // REFRESH PLAYERS

      fetchPlayers()

      toast.success(

        `${player.name} added to team`
      )

    } catch(error){

      console.log(error)

      toast.error(

        'Failed to buy player'
      )
    }
  }

  // REMOVE PLAYER

  const removePlayer = async (playerId) => {

    try {

      const updatedTeam = myTeam.filter(

        player => player._id !== playerId
      )

      // SAVE TEAM

      await API.post(

        '/team/save',

        {

          userId:user._id,

          players:updatedTeam.map(

            item => item._id
          )
        }
      )

      setMyTeam(updatedTeam)

      fetchPlayers()

      toast.success(

        'Player removed'
      )

    } catch(error){

      console.log(error)

      toast.error(

        'Failed to remove player'
      )
    }
  }

  // TOTAL BUDGET

  const totalBudget = Number(

    user?.budget || 0
  )

  // SPENT

  const spentAmount = myTeam.reduce(

    (total, player) => {

      return total + Number(

        player.price || 0
      )

    },

    0
  )

  // REMAINING

  const remainingBudget =

    totalBudget - spentAmount

  // GROUP PLAYERS

  const groupedPlayers = {

    Batter: players.filter(

      player => player.role === 'Batter'
    ),

    Bowler: players.filter(

      player => player.role === 'Bowler'
    ),

    'Wicket Keeper': players.filter(

      player =>

      player.role === 'Wicket Keeper'
    ),

    'All Rounder': players.filter(

      player =>

      player.role === 'All Rounder'
    )
  }

  if(loading){

    return <h2>Loading...</h2>
  }

  return (

    <>

      {/* HEADER */}

      <Header

        remainingBudget={remainingBudget}
      />

      {/* DASHBOARD */}

      <div className='dashboard-container'>

        {/* LEFT */}

        <div className='available-section'>

          <h1 className='section-title'>

            Available Players

          </h1>

          {

            Object.entries(

              groupedPlayers

            ).map(([role, rolePlayers]) => (

              <div key={role}>

                <h2 className='role-title'>

                  {role}

                </h2>

                <div className='player-grid'>

                  {

                    rolePlayers.map(player => (

                      <div

                        key={player._id}

                        className={`player-card ${
                          player.sold
                          ? 'sold-player'
                          : ''
                        }`}
                      >

                        {/* IMAGE */}

                        <img

                          src={player.image}

                          alt={player.name}

                          className='player-image'

                          onError={(e) => {

                            e.target.src =
                            'https://cdn-icons-png.flaticon.com/512/147/147144.png'
                          }}
                        />

                        {/* INFO */}

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

                          <p className='player-type'>

                            {player.playerType}

                          </p>

                          <div className='player-meta'>

                            <span className='rating'>

                              {player.overallRating}

                            </span>

                            <span className='category'>

                              {player.category}

                            </span>

                          </div>

                          <h3 className='price'>

                            ₹ {

                              (
                                player.price /

                                10000000
                              ).toFixed(2)

                            } Cr

                          </h3>

                          {

                            player.sold ? (

                              <button disabled>

                                Sold

                              </button>

                            ) : (

                              <button

                                onClick={() =>

                                  buyPlayer(player)
                                }
                              >

                                Buy Player

                              </button>
                            )
                          }

                        </div>

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

                      {/* IMAGE */}

                      <img

                        src={player.image}

                        alt={player.name}

                        className='player-image'

                        onError={(e) => {

                          e.target.src =
                          'https://cdn-icons-png.flaticon.com/512/147/147144.png'
                        }}
                      />

                      {/* INFO */}

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

                      {/* REMOVE */}

                      <button

                        onClick={() =>

                          removePlayer(
                            player._id
                          )
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