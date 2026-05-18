import { Link } from 'react-router-dom'

function PlayerCard({ player }) {

    return (

        <div className='card'>

            <img
            src={player.image}
            alt={player.name}
            />

            <div className='card-body'>

            <h3>{player.name}</h3>

            <p>{player.role}</p>

            <h4>
                ₹ {player.price}
            </h4>

            <Link to={`/player/${player._id}`}>

                <button>
                View Details
                </button>

            </Link>

            </div>

        </div>
    )
}

export default PlayerCard