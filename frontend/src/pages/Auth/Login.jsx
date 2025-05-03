import "./Auth.css"

import { Link } from "react-router-dom"

const Login = () => {


  return (
    <div className="login">
      <div className="containerForm">
      <form className="formRegister">
        <div className="inputAction name">
        <input 
          type="email" 
          placeholder="E-mail" 
          />
        </div>
        <div className="inputAction name">
          <input 
          type="password" 
          placeholder="Senha"
          />
        </div>

        <div className="btns">
          <button>Login</button>
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