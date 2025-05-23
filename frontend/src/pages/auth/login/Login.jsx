import './Login.css'
import '../style_general.css'

import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
    const [estado, setEstate] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const modify = () => {
        setEstate(!estado)
        console.log(estado)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        const dataLogin = {
            email,
            password
        }

        console.log(dataLogin)
        setEmail("")
        setPassword("")
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
                    <form className='form-login'>
                        <div className='input-form-r'>
                            <input type="text" placeholder='Nome de usuário' />
                        </div>
                        <div className='input-form-r'>
                            <input type="text" placeholder='E-mail' />
                        </div>
                        <div className='input-form-r'>
                            <input type="password" placeholder='Sua senha...' />
                        </div>
                        <div className='input-form-r'>
                            <input type="password" placeholder='Repita a senha' />
                        </div>
                        <div className='local-btns-r'>
                            <button>Fazer Login</button>
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