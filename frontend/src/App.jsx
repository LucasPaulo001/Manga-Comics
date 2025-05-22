import './App.css'

//Componentes
import Login from './pages/auth/login/Login'

//Router
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
