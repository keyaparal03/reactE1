import {
    useEffect,
    useState
} from 'react'

import { useParams } from 'react-router-dom'

import API from '../services/api'

function PlayerDetails() {

    const { id } = useParams()

    const [player, setPlayer] = useState(null)

    useEffect(() => {
        const fetchPlayer = async () => {

            try {

                const response = await API.get(
                `/players/${id}`
                )

                setPlayer(response.data)

            }
            catch (error) {

                console.log(error)
            }
        }
        fetchPlayer()

    }, [])



    if (!player) {

        return <h1>Loading...</h1>
    }

    return (

        <div className='details-page'>

            <div className='details-card'>

            <img
                src={player.image}
                alt={player.name}
            />

            <div className='details-info'>

                <h1>{player.name}</h1>

                <p>
                Role: {player.role}
                </p>

                <p>
                Team: {player.team}
                </p>

                <p>
                Country: {player.country}
                </p>

                <p>
                Rating: {player.rating}
                </p>

                <p>
                Price: ₹ {player.price}
                </p>

            </div>

            </div>

        </div>
    )
}

export default PlayerDetails