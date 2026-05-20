import {

  useEffect,
  useState

} from 'react'

import {

  useParams,
  Link

} from 'react-router-dom'

import API from '../../services/api'

import Header from '../../components/Header/Header'

import {

  GiCricketBat,
  GiBaseballGlove,
  GiTennisBall

} from 'react-icons/gi'

import './PlayerDetails.css'

function PlayerDetails() {

  const {

    id

  } = useParams()

  const [player, setPlayer] = useState(null)
    useEffect(() => {

    const fetchPlayer = async () => {

    try {

        const response = await API.get(

        `/players/${id}`
        )

        setPlayer(
        response.data
        )

    } catch (error) {

        console.log(error)
    }
    }

    fetchPlayer()

    }, [id])

 

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

  if (!player) {

    return <h1>Loading...</h1>
  }

  return (

    <>

      <Header remainingBudget={0} />

      <div className='player-details-page'>

        <div className='player-details-card'>

          {/* ICON */}

          <div className='details-icon'>

            {

              getRoleIcon(
                player.role
              )
            }

          </div>

          {/* DETAILS */}

          <h1>

            {player.name}

          </h1>

          <p>

            Country:

            <span>

              {player.country}

            </span>

          </p>

          <p>

            Role:

            <span>

              {player.role}

            </span>

          </p>

          <p>

            Price:

            <span>

              ₹ {

                (
                  player.price /

                  10000000
                ).toFixed(2)

              } Cr

            </span>

          </p>

          <p>

            Status:

            <span>

              {

                player.sold

                  ? 'Sold'

                  : 'Available'
              }

            </span>

          </p>

          {

            player.sold && (

              <p>

                Team:

                <span>

                  {

                    player.soldTeamName
                  }

                </span>

              </p>
            )
          }

          {/* BACK */}

          <Link
            to='/dashboard'
            className='back-btn'
          >

            Back To Dashboard

          </Link>

        </div>

      </div>

    </>
  )
}

export default PlayerDetails