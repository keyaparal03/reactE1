/* eslint-disable react-refresh/only-export-components */

import {

  createContext,
  useContext,
  useEffect,
  useState

} from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {

  // LOAD USER FROM SESSION STORAGE

  const [user, setUser] = useState(() => {

    const savedUser = sessionStorage.getItem(
      'dreamArenaUser'
    )

    return savedUser

      ? JSON.parse(savedUser)

      : null
  })

  // SAVE USER TO SESSION STORAGE

  useEffect(() => {

    if (user) {

      sessionStorage.setItem(

        'dreamArenaUser',

        JSON.stringify(user)
      )

    } else {

      sessionStorage.removeItem(

        'dreamArenaUser'
      )
    }

  }, [user])

  // LOGIN

  const login = (userData) => {

    setUser(userData)
  }

  // LOGOUT

  const logout = () => {

    setUser(null)

    sessionStorage.removeItem(
      'dreamArenaUser'
    )
  }

  return (

    <AuthContext.Provider
      value={{

        user,

        login,

        logout
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}

const useAuthContext = () => {

  return useContext(AuthContext)
}

export {

  AuthProvider,
  useAuthContext
}