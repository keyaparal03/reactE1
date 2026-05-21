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

import './PlayerDetails.css'

function PlayerDetails() {

  const {

    id

  } = useParams()

  const [player, setPlayer] = useState(null)

  const [loading, setLoading] = useState(true)

  // USER

  const user = JSON.parse(

    localStorage.getItem('user')
  )

  // FETCH PLAYER

  useEffect(() => {
     const fetchPlayer = async () => {

      try {

        const response = await API.get(

          `/players/${id}`
        )

        setPlayer(

          response.data
        )

      } catch(error){

        console.log(error)
      }

      setLoading(false)
    }
    fetchPlayer()

  }, [id])

 

  // LOADING

  if(loading){

    return (

      <>
      
        <Header

          remainingBudget={
            user?.budget || 0
          }
        />

        <div className='player-details-page'>

          <h1>

            Loading...

          </h1>

        </div>

      </>
    )
  }

  // PLAYER NOT FOUND

  if(!player){

    return (

      <>
      
        <Header

          remainingBudget={
            user?.budget || 0
          }
        />

        <div className='player-details-page'>

          <div className='player-details-card'>

            <h1>

              Player Not Found

            </h1>

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

  return (

    <>
    
      <Header

        remainingBudget={
          user?.budget || 0
        }
      />

      <div className='player-details-page'>

        <div className='player-details-card'>

          {/* IMAGE */}

          <img

            src={player.image}

            alt={player.name}

            className='details-image'

            onError={(e) => {

              e.target.src =
              'https://cdn-icons-png.flaticon.com/512/147/147144.png'
            }}
          />

          {/* NAME */}

          <h1>

            {player.name}

          </h1>

          {/* DETAILS */}

          <p>

            Role:

            <span>

              {player.role}

            </span>

          </p>

          <p>

            Player Type:

            <span>

              {player.playerType}

            </span>

          </p>

          <p>

            Country:

            <span>

              {player.country}

            </span>

          </p>

          <p>

            Category:

            <span>

              {player.category}

            </span>

          </p>

          <p>

            Rating:

            <span>

              {player.overallRating}

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

          {/* BUTTON */}

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