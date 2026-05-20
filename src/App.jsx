import {

  Routes,
  Route

} from 'react-router-dom'

import Home from './pages/Home/Home'

import Login from './pages/Login/Login'

import Register from './pages/Register/Register'

import Dashboard from './pages/Dashboard/Dashboard'

import PlayerDetails from './pages/PlayerDetails/PlayerDetails'

import NotFound from './pages/NotFound/NotFound'

import Footer from './components/Footer/Footer'

import ProtectedRoute from './routes/ProtectedRoute'

import PublicRoute from './routes/PublicRoute'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

function App() {

  return (

    <ErrorBoundary>

      <Routes>

        {/* HOME */}

        <Route
          path='/'
          element={<Home />}
        />

        {/* LOGIN */}

        <Route
          path='/login'
          element={

            <PublicRoute>

              <Login />

            </PublicRoute>
          }
        />

        {/* REGISTER */}

        <Route
          path='/register'
          element={

            <PublicRoute>

              <Register />

            </PublicRoute>
          }
        />

        {/* DASHBOARD */}

        <Route
          path='/dashboard'
          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        {/* PLAYER DETAILS */}

        <Route
          path='/player/:id'
          element={

            <ProtectedRoute>

              <PlayerDetails />

            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route
          path='*'
          element={<NotFound />}
        />

      </Routes>

      <Footer />

    </ErrorBoundary>
  )
}

export default App