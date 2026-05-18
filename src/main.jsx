import ReactDOM from 'react-dom/client'

import {
  BrowserRouter
} from 'react-router-dom'

import App from './App'

import './index.css'

import {
  ToastContainer
} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import {
  AuthProvider
} from './context/AuthContext'

import {
  PlayerProvider
} from './context/PlayerContext'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <ErrorBoundary>

    <BrowserRouter>

      <AuthProvider>

        <PlayerProvider>

          <App />

          <ToastContainer />

        </PlayerProvider>

      </AuthProvider>

    </BrowserRouter>

  </ErrorBoundary>
)