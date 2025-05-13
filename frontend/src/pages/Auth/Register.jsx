import "./Auth.css"
import Message from "../../components/Message"

//Imagens
import background from "../../assets/images/background.jpg"
import {Link} from "react-router-dom"

//Hooks
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'

//Redux
import { register, reset } from "../../slices/authSlice"

const Register = () => {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const dispatch = useDispatch() 

    const { loading, error } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            nome, 
            email,
            password,
            confirmPass
        } 

        dispatch(register(user))
    }

    useEffect(() => {
        dispatch(reset())
    }, [dispatch])


  return (
    <div className="register">
        <div className="containerForm">
            <form onSubmit={handleSubmit} className="formRegister">
                <div className="msgRegister">
                    <h5>Cadastre-se no universo dos mangás e HQs com um clique!</h5>
                </div>
            
                <div className="inputAction name">
                    <input 
                    type="text" 
                    placeholder="Nome de usuário..." 
                    value={nome || ""}
                    onChange={(e) => {setNome(e.target.value)}}
                    />
                    <button className="btnAction">Verificar</button>
                </div>
                <div className="inputAction">
                    <input 
                    type="email" 
                    placeholder="E-mail" 
                    value={email || ""}
                    onChange={(e) => {setEmail(e.target.value)}}
                    />
                </div>
                <div className="inputAction">
                    <div className="validationPass">
                        <input
                        type="password"
                        placeholder="Senha"
                        value={password || ""}
                        onChange={(e) => {setPassword(e.target.value)}}
                        />
                        {
                            password.length < 5 && password.length > 1 ?
                                <span className="msgPass">
                                    A senha tem que ter no mínimo 5 caracteres!
                                </span> 
                            : ""
                        }
                    </div>
                </div>
                <div className="inputAction">
                    <div className="validationPass">
                        <input 
                        type="password" 
                        placeholder="Repita a senha" 
                        value={confirmPass || ""}
                        onChange={(e) => {setConfirmPass(e.target.value)}}
                        />
                        {
                            
                            confirmPass.length >= 2 && password !== confirmPass ?
                             <span className="msgPass">
                                As senhas não estão iguais
                            </span> 
                            : ""
                        }
                    </div>
                </div>
                <div className="btns">
                    {!loading && <button type="submit">Fazer registro</button>}
                    {loading && <button disabled type="submit">Carregando...</button>}
                    {error && <Message msg={error} type="error" />}
                    
                    <span className="line"></span>
                    <span id="msg">
                        Já tem uma conta? <Link to={'/login'}>Clique aqui</Link>
                    </span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register