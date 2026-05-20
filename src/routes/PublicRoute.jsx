import {

  Navigate

} from 'react-router-dom'

import {

  useAuthContext

} from '../context/AuthContext'

function PublicRoute({ children }) {

  const {

    user

  } = useAuthContext()

  // IF USER LOGGED IN

  if(user){

    return <Navigate to='/dashboard' />
  }

  return children
}

export default PublicRoute