import { useEffect, useState } from 'react'
import API from '../services/api'
import Header from '../components/Header'

function Dashboard() {

const [players, setPlayers] = useState([])

const [myTeam, setMyTeam] = useState([])

const user = JSON.parse(
localStorage.getItem('user')
)

useEffect(() => {

const loadData = async () => {

    try {

    // PLAYERS

    const playerResponse = await API.get(
        '/players'
    )

    setPlayers(
        playerResponse.data
    )

    // USER TEAM

    const teamResponse = await API.get(

        `/team/${user._id}`
    )

    if (teamResponse.data) {

        setMyTeam(
        teamResponse.data.players
        )
    }

    } catch (error) {

    console.log(error)
    }
}

loadData()

}, [])

// SAVE TEAM

const saveTeam = async (updatedTeam) => {

try {

    await API.post(

    '/team/save',

    {

        userId: user._id,

        players: updatedTeam.map(
        player => player._id
        )
    }
    )

} catch (error) {

    console.log(error)
}
}

// ADD PLAYER

const addPlayer = async (player) => {

const exists = myTeam.find(

    item => item._id === player._id
)

if (exists) {

    alert('Player already added')

    return
}

// ROLE COUNTS

const batterCount = myTeam.filter(
    p => p.role === 'Batter'
).length

const bowlerCount = myTeam.filter(
    p => p.role === 'Bowler'
).length

const wicketKeeperCount = myTeam.filter(
    p => p.role === 'Wicket Keeper'
).length

const allRounderCount = myTeam.filter(
    p => p.role === 'All Rounder'
).length

// ROLE LIMITS

if (
    player.role === 'Batter' &&
    batterCount >= 5
) {

    alert('Only 5 Batters allowed')

    return
}

if (
    player.role === 'Bowler' &&
    bowlerCount >= 5
) {

    alert('Only 5 Bowlers allowed')

    return
}

if (
    player.role === 'Wicket Keeper' &&
    wicketKeeperCount >= 2
) {

    alert('Only 2 Wicket Keepers allowed')

    return
}

if (
    player.role === 'All Rounder' &&
    allRounderCount >= 3
) {

    alert('Only 3 All Rounders allowed')

    return
}

// TOTAL TEAM LIMIT

if (myTeam.length >= 15) {

    alert('Maximum 15 players allowed')

    return
}

// BUDGET CHECK

const totalSpent = myTeam.reduce(

    (total, item) =>

    total + item.price,

    0
)

const totalAfterAdd =

    totalSpent + player.price

if (

    totalAfterAdd >

    Number(user.budget)

) {

    alert('Budget exceeded')

    return
}

const updatedTeam = [

    ...myTeam,

    player
]

setMyTeam(updatedTeam)

await saveTeam(updatedTeam)
}

// REMOVE PLAYER

const removePlayer = async (id) => {

const updatedTeam = myTeam.filter(

    player => player._id !== id
)

setMyTeam(updatedTeam)

await saveTeam(updatedTeam)
}

// TOTAL SPENT

const totalSpent = myTeam.reduce(

(total, item) =>

    total + item.price,

0
)

// REMAINING BUDGET

const remainingBudget =

Number(user.budget) -

totalSpent

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

        <h2>
        Available Players
        </h2>

        {

        Object.keys(groupedPlayers).map(role => (

            <div key={role}>

            <h3 className='role-title'>
                {role}
            </h3>

            <div className='player-grid'>

                {

                groupedPlayers[role].map(player => (

                    <div
                    key={player._id}
                    className='player-card'
                    >

                    {/* <img
                        src={player.image}
                        alt={player.name}
                    /> */}

                    <div className='player-info'>

                        <h4>
                        {player.name}
                        </h4>

                        <p>
                        {player.country}
                        </p>

                        <p className='price'>

                        ₹ {(player.price / 10000000).toFixed(2)} Cr

                        </p>

                    </div>

                    <button
                        onClick={() =>
                        addPlayer(player)
                        }
                    >

                        Add Player

                    </button>

                    </div>
                ))
                }

            </div>

            </div>
        ))
        }

    </div>

    {/* RIGHT SIDE */}

    <div className='team-section'>

        <h2>
        My Team ({myTeam.length}/15)
        </h2>

        {

        myTeam.length === 0 ? (

            <p>
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

                    {/* <img
                    src={player.image}
                    alt={player.name}
                    /> */}

                    <div className='player-info'>

                    <h4>
                        {player.name}
                    </h4>

                    <p>
                        {player.role}
                    </p>

                    <p className='price'>

                        ₹ {(player.price / 10000000).toFixed(2)} Cr

                    </p>

                    </div>

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