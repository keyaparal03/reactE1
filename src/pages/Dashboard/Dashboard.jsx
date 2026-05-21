import {

  useEffect,
  useState

} from 'react'

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
    const fetchPlayers = async () => {

      try {

        const response = await API.get(

          '/players'
        )

        setPlayers(

          response.data
        )

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
    fetchPlayers()

    fetchMyTeam()

  }, [])

  // FETCH PLAYERS



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

        'Maximum 15 players allowed.'
      )
    }

    // ROLE COUNTS

    const batters = myTeam.filter(

      item => item.role === 'Batter'
    )

    const bowlers = myTeam.filter(

      item => item.role === 'Bowler'
    )

    const wicketKeepers = myTeam.filter(

      item =>

      item.role === 'Wicket Keeper'
    )

    const allRounders = myTeam.filter(

      item =>

      item.role === 'All Rounder'
    )

    // BATTER LIMIT

    if(

      player.role === 'Batter' &&

      batters.length >= 5
    ){

      return toast.error(

        'Maximum 5 Batters allowed.'
      )
    }

    // BOWLER LIMIT

    if(

      player.role === 'Bowler' &&

      bowlers.length >= 5
    ){

      return toast.error(

        'Maximum 5 Bowlers allowed.'
      )
    }

    // WK LIMIT

    if(

      player.role === 'Wicket Keeper' &&

      wicketKeepers.length >= 2
    ){

      return toast.error(

        'Maximum 2 Wicket Keepers allowed.'
      )
    }

    // AR LIMIT

    if(

      player.role === 'All Rounder' &&

      allRounders.length >= 3
    ){

      return toast.error(

        'Maximum 3 All Rounders allowed.'
      )
    }

    // BUDGET CHECK

    if(remainingBudget < player.price){

      return toast.error(

        `Insufficient budget for ${player.name}`
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

        remainingBudget={
          remainingBudget
        }
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

                    rolePlayers.map(player => {

                      const alreadyAdded =

                        myTeam.find(

                          item =>

                          item._id === player._id
                        )

                      return (

                        <div

                          key={player._id}

                          className='player-card'
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

                              {player.country}

                            </p>

                            {/* TAGS */}

                            <div className='player-tags'>

                              <span className='player-role-badge'>

                                {player.playerType}

                              </span>

                              <span className='player-category-badge'>

                                {player.category}

                              </span>

                            </div>

                            {/* RATING */}

                            <div className='player-rating'>

                              ⭐ {

                                player.overallRating
                              }

                            </div>

                            {/* PRICE */}

                            <h3 className='price'>

                              ₹ {

                                (
                                  player.price /

                                  10000000
                                ).toFixed(2)

                              } Cr

                            </h3>

                          </div>

                          {/* BUTTON */}

                          <button

                            disabled={alreadyAdded}

                            onClick={() =>

                              buyPlayer(player)
                            }
                          >

                            {

                              alreadyAdded

                              ?

                              'Sold'

                              :

                              'Buy Player'
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

                          {player.country}

                        </p>

                        <div className='player-tags'>

                          <span className='player-role-badge'>

                            {player.playerType}

                          </span>

                          <span className='player-category-badge'>

                            {player.category}

                          </span>

                        </div>

                        <div className='player-rating'>

                          ⭐ {

                            player.overallRating
                          }

                        </div>

                        <h3 className='price'>

                          ₹ {

                            (
                              player.price /

                              10000000
                            ).toFixed(2)

                          } Cr

                        </h3>

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