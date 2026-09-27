import { BrowserRouter } from 'react-router-dom'
import AuthRoutes from './routes/Auth.routes'
import { AuthProvider } from './features/auth/AuthProvider.jsx'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
