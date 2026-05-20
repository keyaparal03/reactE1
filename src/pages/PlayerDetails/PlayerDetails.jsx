import {

  useEffect,
  useState

} from 'react'

import {

  useParams

} from 'react-router-dom'

import API from '../../services/api'

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

      } catch(error){

        console.log(error)
      }
    }

    fetchPlayer()

  }, [id])

  if(!player){

    return <h2>Loading...</h2>
  }

  return (

    <div className='details-container'>

      <div className='details-card'>

        <h1>

          {player.name}

        </h1>

        <p>

          <strong>

            Role:

          </strong>

          {player.role}

        </p>

        <p>

          <strong>

            Player Type:

          </strong>

          {player.playerType}

        </p>

        <p>

          <strong>

            Overall Rating:

          </strong>

          ⭐ {player.overallRating}

        </p>

        <p>

          <strong>

            Category:

          </strong>

          {player.category}

        </p>

        <p>

          <strong>

            Country:

          </strong>

          {player.country}

        </p>

        <p>

          <strong>

            Base Price:

          </strong>

          ₹ {

            (
              player.basePrice /

              10000000
            ).toFixed(2)

          } Cr

        </p>

        <p>

          <strong>

            Auction Price:

          </strong>

          ₹ {

            (
              player.price /

              10000000
            ).toFixed(2)

          } Cr

        </p>

      </div>

    </div>
  )
}

export default PlayerDetails