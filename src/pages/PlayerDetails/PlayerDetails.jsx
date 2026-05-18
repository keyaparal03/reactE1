import {

  useParams,
  useNavigate

} from 'react-router-dom'

import {

  usePlayerContext

} from '../../context/PlayerContext'

import Header from '../../components/Header/Header'

import {

  useAuthContext

} from '../../context/AuthContext'

import './PlayerDetails.css'

function PlayerDetails() {

  const { id } = useParams()

  const navigate = useNavigate()

  const {

    players

  } = usePlayerContext()

  const {

    user

  } = useAuthContext()

  const player = players.find(

    item => item._id === id
  )

  const totalSpent = 0

  const remainingBudget =

    Number(user?.budget || 0) -

    totalSpent

  if (!player) {

    return (

      <>

        <Header
          remainingBudget={
            remainingBudget
          }
        />

        <div className='player-details-container'>

          <h1>
            Player Not Found
          </h1>

        </div>

      </>
    )
  }

  return (

    <>

      <Header
        remainingBudget={
          remainingBudget
        }
      />

      <div className='player-details-container'>

        <div className='player-details-card'>

          <img
            src={player.image}
            alt={player.name}
          />

          <div className='player-content'>

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
                Country:
              </strong>

              {player.country}

            </p>

            <p>

              <strong>
                Price:
              </strong>

              ₹ {

                (
                  player.price /

                  10000000

                ).toFixed(2)

              } Cr

            </p>

            <button
              onClick={() =>
                navigate(-1)
              }
            >

              Go Back

            </button>

          </div>

        </div>

      </div>

    </>
  )
}

export default PlayerDetails