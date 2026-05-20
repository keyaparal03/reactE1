import {

  useEffect,
  useState

} from 'react'

import {

  useParams,
  useNavigate

} from 'react-router-dom'

import API from '../../services/api'

import Header from '../../components/Header/Header'

import './PlayerDetails.css'

function PlayerDetails() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [player,setPlayer] = useState(null)

  useEffect(() => {

    const fetchPlayer = async () => {

      try {

        const response = await API.get(

          `/players/${id}`
        )

        setPlayer(response.data)

      } catch(error){

        console.log(error)
      }
    }

    fetchPlayer()

  }, [id])

  if(!player){

    return (

      <>
        <Header />

        <div className='details-container'>

          <h2 className='loading-text'>

            Loading...

          </h2>

        </div>
      </>
    )
  }

  return (

    <>

      <Header />

      <div className='details-container'>

        <div className='player-details-card'>

          {/* IMAGE */}

          <div className='player-image-section'>

            <img

              src={

                player.image ||

                'https://via.placeholder.com/350'
              }

              alt={player.name}

              className='details-player-image'
            />

          </div>

          {/* CONTENT */}

          <div className='player-content'>

            <h1>

              {player.name}

            </h1>

            <p className='player-country'>

              {player.country}

            </p>

            {/* ROLE */}

            <div className='player-role'>

              {player.playerType}

            </div>

            {/* RATING */}

            <div className='player-rating-row'>

              <span className='rating'>

                ⭐ {

                  player.overallRating ||

                  0
                }

              </span>

              <span className='category'>

                {

                  player.category ||

                  'Capped'
                }

              </span>

            </div>

            {/* PRICE */}

            <h2 className='player-price'>

              ₹ {

                player.price

                  ?

                  (
                    player.price /

                    10000000
                  ).toFixed(2)

                  :

                  '0.00'

              } Cr

            </h2>

            {/* DETAILS */}

            <div className='details-grid'>

              <div className='details-box'>

                <span>

                  Role

                </span>

                <h3>

                  {player.role}

                </h3>

              </div>

              <div className='details-box'>

                <span>

                  Base Price

                </span>

                <h3>

                  ₹ {

                    player.basePrice

                      ?

                      (
                        player.basePrice /

                        10000000
                      ).toFixed(2)

                      :

                      '0.00'

                  } Cr

                </h3>

              </div>

              <div className='details-box'>

                <span>

                  Team Type

                </span>

                <h3>

                  {

                    player.category ||

                    'Capped'
                  }

                </h3>

              </div>

              <div className='details-box'>

                <span>

                  Country

                </span>

                <h3>

                  {player.country}

                </h3>

              </div>

            </div>

            {/* ABOUT */}

            <div className='about-player'>

              <h3>

                About Player

              </h3>

              <p>

                {player.name}

                is a talented

                {player.playerType}

                from

                {player.country}.

                With an impressive rating of

                {player.overallRating},

                this player is considered one of the
                key match winners in DreamArena
                Premier League auction.

              </p>

            </div>

            {/* BUTTON */}

            <button

              className='dashboard-btn'

              onClick={() =>

                navigate('/dashboard')
              }
            >

              ← Back To Dashboard

            </button>

          </div>

        </div>

      </div>

    </>
  )
}

export default PlayerDetails