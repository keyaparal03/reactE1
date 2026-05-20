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
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Footer from './components/Footer/Footer'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {

  return (
<ErrorBoundary>
    <>

      <Routes>
          <Route
            path='/'
            element={<Home />}
          />


        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
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
    </ErrorBoundary>
  )
}

export default App