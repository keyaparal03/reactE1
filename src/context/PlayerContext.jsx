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

  useEffect(() => {

    if (user) {

      loadData()
    }

  }, [user])

  // LOAD DATA

  const loadData = async () => {

    try {

      const playerResponse = await API.get(
        '/players'
      )

      setPlayers(
        playerResponse.data
      )

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

      toast.error(
        'Player already added'
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

    if (
      player.role === 'Batter' &&
      batterCount >= 5
    ) {

      toast.error(
        'Only 5 Batters allowed'
      )

      return
    }

    if (
      player.role === 'Bowler' &&
      bowlerCount >= 5
    ) {

      toast.error(
        'Only 5 Bowlers allowed'
      )

      return
    }

    if (
      player.role === 'Wicket Keeper' &&
      wicketKeeperCount >= 2
    ) {

      toast.error(
        'Only 2 Wicket Keepers allowed'
      )

      return
    }

    if (
      player.role === 'All Rounder' &&
      allRounderCount >= 3
    ) {

      toast.error(
        'Only 3 All Rounders allowed'
      )

      return
    }

    // TEAM LIMIT

    if (myTeam.length >= 15) {

      toast.error(
        'Maximum 15 players allowed'
      )

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

      toast.error(
        'Budget exceeded'
      )

      return
    }

    const updatedTeam = [

      ...myTeam,

      player
    ]

    setMyTeam(updatedTeam)

    await saveTeam(updatedTeam)

    toast.success(
      'Player Added'
    )
  }

  // REMOVE PLAYER

  const removePlayer = async (id) => {

    const updatedTeam = myTeam.filter(

      player => player._id !== id
    )

    setMyTeam(updatedTeam)

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