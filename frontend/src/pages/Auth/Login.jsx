import "./Auth.css"

import { Link } from "react-router-dom"
import Message from "../../components/Message"

//Hooks
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

//Redux
import { login, reset } from "../../slices/authSlice"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }
    
    dispatch(login(user))
    console.log(user)
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div className="login">
      <div className="containerForm">
      <form onSubmit={handleSubmit} className="formRegister">
        <div className="inputAction name">
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email || ''}
          onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>
        <div className="inputAction name">
          <input 
          type="password" 
          placeholder="Senha"
          value={password || ''}
          onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>

        <div className="btns">
          {!loading && <button type="submit">Fazer Login</button>}
          {loading && <button disabled type="submit">Carregando...</button>}
          {error && <Message msg={error} type="error" />}
          <span className="line"></span>
          <span id="msg">
              Não tem uma conta? <Link to={'/register'}>Clique aqui</Link>
          </span>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login