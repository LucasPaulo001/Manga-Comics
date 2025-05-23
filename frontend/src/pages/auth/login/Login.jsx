import './Login.css'
import '../style_general.css'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [estado, setEstate] = useState(true)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPass] = useState("")
    const { token, success, usuario, register, login, logout, errors } = useAuth()
    const Navigate = useNavigate()

    const modify = () => {
        setEstate(!estado)
        console.log(estado)
    }

    //Configurações de login
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(usuario)
        await login(email, password)
        if(usuario){
            Navigate("/home")
        }

        const dataLogin = {
            email,
            password
        }

        console.log(dataLogin)
        setEmail("")
        setPassword("")
    }

    useEffect(() => {
        if(usuario){
            Navigate("/home")
        }
    }, [usuario])


    //Configurações de registro
    const handleRegister = async (e) => {
        e.preventDefault()

        const success = await register(nome, email, password, confirmPassword)

        if(success){
            setEstate(true)
        }

        const dataRegister = {
            nome,
            email,
            password,
            confirmPassword
        }

        console.log(dataRegister)
    }

    

    return (
        <>
        {/* Conteúdo de login */}
        <div id='login_register'>
            <div className={estado ? 'content-login' : "desative-login"}>
                <h1 id='titlePage'>Mangá Comics</h1>
                <div className='login'>
                    <h1>Faça o seu <span id='loginName'>login</span></h1>
                    <form onSubmit={handleLogin} className='form-login'>
                        <div className='input-form'>
                            <input type="text" 
                            placeholder='E-mail'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='input-form'>
                            <input type="password" 
                            placeholder='Sua senha...' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='local-btns'>
                            <button type='submit'>Fazer Login</button>
                        </div>
                        {errors && <span className='errorMessage'>{errors}</span> }
                    </form>
                    <article>
                        <span onClick={modify} className='to-register'>Não tem uma conta? <a href="#register">clique aqui</a> </span>
                    </article>
                </div>
                <section className='img-decoration img-login'>
                    
                </section>
            </div>

        {/* Conteúdo de registro */}
            <div className={estado == false ? "content-register" : "desative_register"} id='register'>
                <h1 id='titlePage-r'>Mangá Comics</h1>
                <section className='img-decoration img-register'>
                    
                </section>
                <div className='register'>
                    <h1>Faça o seu <span id='registerName'>Cadastro</span></h1>
                    <form onSubmit={handleRegister} className='form-login'>
                        <div className='input-form-r'>
                            <input type="text" 
                            placeholder='Nome de usuário' 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div className='input-form-r'>
                            <input type="text" 
                            placeholder='E-mail' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='input-form-r'>
                            <input type="password" 
                            placeholder='Sua senha...' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='input-form-r'>
                            <input type="password" 
                            placeholder='Repita a senha' 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            />
                        </div>
                        <div className='local-btns-r'>
                            <button type='submit'>Cadastrar</button>
                            {errors && <span className='errorMessage'>{errors}</span>}
                            {success && <span className='successMessage'>{success}</span>}
                        </div>
                    </form>
                    <article>
                        <span onClick={modify} className='to-login'>Já tem uma conta? <Link>clique aqui</Link> </span>
                    </article>
                </div>
            </div>
        </div>

        </>
    )
}

export default Login