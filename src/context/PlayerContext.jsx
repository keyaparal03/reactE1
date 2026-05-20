/* eslint-disable react-refresh/only-export-components */
import {

  createContext,
  useContext,
  useEffect,
  useState

} from 'react'

import {

  toast

} from 'react-toastify'

import API from '../services/api'

import {

  useAuthContext

} from './AuthContext'

const PlayerContext = createContext()

function PlayerProvider({ children }) {

  const [players, setPlayers] = useState([])

  const [myTeam, setMyTeam] = useState([])

  const {

    user

  } = useAuthContext()

  // LOAD DATA

  useEffect(() => {

    const loadData = async () => {

      if(!user){

        return
      }

      try {

        // GET ALL PLAYERS

        const playerResponse = await API.get(

          '/players'
        )

        setPlayers(
          playerResponse.data
        )

        // GET USER TEAM

        const teamResponse = await API.get(

          `/team/${user._id}`
        )

        setMyTeam(

          teamResponse.data?.players || []
        )

      } catch(error){

        console.log(error)
      }
    }

    loadData()

  }, [user])

  // SAVE TEAM

  const saveTeam = async (updatedTeam) => {

    try {

      await API.post(

        '/team/save',

        {

          userId:user._id,

          players:updatedTeam.map(

            player => player._id
          )
        }
      )

    } catch(error){

      console.log(error)
    }
  }

  // ADD PLAYER

  const addPlayer = async (player) => {

    // ALREADY EXISTS

    const exists = myTeam.find(

      item =>

        item._id === player._id
    )

    if(exists){

      toast.error(

        'This player is already in your team.'
      )

      return
    }

    // SOLD TO OTHER USER

    if(

      player.sold &&

      String(player.soldTo)

      !==

      String(user._id)
    ){

      toast.error(

        `${player.name} already sold to ${player.soldTeamName}`
      )

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

    if(

      player.role === 'Batter' &&

      batterCount >= 5
    ){

      toast.error(

        'Maximum 5 Batters allowed.'
      )

      return
    }

    if(

      player.role === 'Bowler' &&

      bowlerCount >= 5
    ){

      toast.error(

        'Maximum 5 Bowlers allowed.'
      )

      return
    }

    if(

      player.role === 'Wicket Keeper' &&

      wicketKeeperCount >= 2
    ){

      toast.error(

        'Maximum 2 Wicket Keepers allowed.'
      )

      return
    }

    if(

      player.role === 'All Rounder' &&

      allRounderCount >= 3
    ){

      toast.error(

        'Maximum 3 All Rounders allowed.'
      )

      return
    }

    // TEAM SIZE

    if(myTeam.length >= 15){

      toast.error(

        'Team is full (max 15 players).'
      )

      return
    }

    // BUDGET CHECK

    const totalSpent = myTeam.reduce(

      (total, item) =>

        total + item.price,

      0
    )

    const remainingBudget =

      Number(user.budget)

      -

      totalSpent

    if(

      remainingBudget < player.price
    ){

      toast.error(

        `Insufficient budget to buy ${player.name}
        (Price: ₹${player.price},
        Remaining: ₹${remainingBudget})`
      )

      return
    }

    // UPDATED TEAM

    const updatedTeam = [

      ...myTeam,

      player
    ]

    setMyTeam(updatedTeam)

    // UPDATE PLAYERS STATE

    const updatedPlayers = players.map(

      item => {

        if(item._id === player._id){

          return {

            ...item,

            sold:true,

            soldTo:user._id,

            soldTeamName:user.teamName
          }
        }

        return item
      }
    )

    setPlayers(updatedPlayers)

    // SAVE TEAM

    await saveTeam(updatedTeam)

    toast.success(

      `${player.name} added to your team.`
    )
  }

  // REMOVE PLAYER

  const removePlayer = async (id) => {

    const updatedTeam = myTeam.filter(

      player => player._id !== id
    )

    setMyTeam(updatedTeam)

    // UPDATE PLAYER STATUS

    const updatedPlayers = players.map(

      item => {

        if(item._id === id){

          return {

            ...item,

            sold:false,

            soldTo:null,

            soldTeamName:''
          }
        }

        return item
      }
    )

    setPlayers(updatedPlayers)

    // SAVE TEAM

    await saveTeam(updatedTeam)

    toast.success(

      'Player Removed'
    )
  }

  return (

    <PlayerContext.Provider

      value={{

        players,
        myTeam,

        addPlayer,
        removePlayer
      }}
    >

      {children}

    </PlayerContext.Provider>
  )
}

const usePlayerContext = () => {

  return useContext(PlayerContext)
}

export {

  PlayerProvider,
  usePlayerContext
}

export default PlayerContext