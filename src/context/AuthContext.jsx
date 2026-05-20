import {

  createContext,
  useContext,
  useEffect,
  useState

} from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [user,setUser] = useState(null)

  // LOAD USER

  useEffect(() => {

    const storedUser = localStorage.getItem(

      'user'
    )

    if(storedUser){

      setUser(

        JSON.parse(storedUser)
      )
    }

  }, [])

  // LOGIN

  const loginUser = (userData) => {

    localStorage.setItem(

      'user',

      JSON.stringify(userData)
    )

    setUser(userData)
  }

  // LOGOUT

  const logoutUser = () => {

    localStorage.removeItem('user')

    setUser(null)
  }

  return (

    <AuthContext.Provider

      value={{

        user,
        loginUser,
        logoutUser
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