import {
  Routes,
  Route
} from 'react-router-dom'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import PlayerDetails from './pages/PlayerDetails/PlayerDetails'
import NotFound from './pages/NotFound/NotFound'

import Footer from './components/Footer/Footer'

import ProtectedRoute from './routes/ProtectedRoute'

function App() {

  return (

    <>

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
          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path='/player/:id'
          element={

            <ProtectedRoute>

              <PlayerDetails />

            </ProtectedRoute>
          }
        />

        <Route
          path='*'
          element={<NotFound />}
        />

      </Routes>

      <Footer />

    </>
  )
}

export default App