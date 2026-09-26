import { BrowserRouter } from 'react-router-dom'
import AuthRoutes from './routes/Auth.routes'

const App = () => {
  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  )
}

export default App
