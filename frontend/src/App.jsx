import './App.css'

//Componentes
import Login from './pages/auth/login/Login'
import Home from './pages/home/Home'
import { Footer } from './components/footer/Footer'
import { Mangas } from './components/content/mangas/Mangas'
import { HQs } from './components/content/HQs/HQs'
import { Salvos } from './components/content/saves/Salvos'
import { Novidades } from './components/content/News/Novidades'
import { Generos } from './components/content/Genres/Generos'
import { useAuth } from './contexts/AuthContext'
import { Profile } from './components/profile/Profile'
import Navbar from './components/navbar/Navbar'


//Router
import { Routes, Route, Navigate } from "react-router-dom"


function App() {
  const { token, usuario } = useAuth()
  

  return (
    <>
      <div className="App">
        {token && <Navbar />}
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />

          {token && (
            <Route path='/' element={<Home />}>
              <Route index element={<Mangas />} />
              <Route path="mangas" element={<Mangas />} />
              <Route path="hqs" element={<HQs />} />
              <Route path="salvos" element={<Salvos />} />
              <Route path="novidades" element={<Novidades />} />
              <Route path="generos" element={<Generos />} />
              <Route path='profile' element={<Profile />}/>
            </Route>
          )}

          {!token && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
