import {

  Navigate

} from 'react-router-dom'

function PublicRoute({

  children

}) {

  // CHECK USER

  const user = localStorage.getItem(

    'user'
  )

  // IF LOGGED IN

  if(user){

    return <Navigate to='/dashboard' />
  }

  // OTHERWISE

  return children
}

export default PublicRoute