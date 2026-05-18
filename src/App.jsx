import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PlayerDetails from './pages/PlayerDetails'
import NotFound from './pages/NotFound'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path='/'
          element={<Login />}
        />

        <Route
          path='/register'
          element={<Register />}
        />

        <Route
          path='/dashboard'
          element={<Dashboard />}
        />

        <Route
          path='/player/:id'
          element={<PlayerDetails />}
        />

        <Route
          path='*'
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App