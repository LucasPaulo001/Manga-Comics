import './App.css'
import { AuthProvider } from './contexts/AuthContext'

//Componentes
import Login from './pages/auth/login/Login'
import Home from './pages/home/Home'
import { Footer } from './components/footer/Footer'

import { useAuth } from './contexts/AuthContext'

//Router
import { Routes, Route, Navigate } from "react-router-dom"

function App() {
  const { token } = useAuth()

  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={token ? <Home /> : <Navigate to={"/login"} /> } />
          <Route path='/login' element={!token ? <Login /> : <Navigate to={"/"} />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
