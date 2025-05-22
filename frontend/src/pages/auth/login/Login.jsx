
import './Login.css'
import '../style_general.css'

import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>


            <div className='content-login'>
                <div className='login'>
                    <h1>Faça o seu <span id='loginName'>login</span></h1>
                    <form className='form-login'>
                        <div className='input-form'>
                            <input type="text" placeholder='E-mail' />
                        </div>
                        <div className='input-form'>
                            <input type="password" placeholder='Sua senha...' />
                        </div>
                        <div className='local-btns'>
                            <button>Fazer Login</button>
                        </div>
                    </form>
                    <article>
                        <span className='to-register'>Não tem uma conta? <Link>clique aqui</Link> </span>
                    </article>
                </div>
                <section className='img-decoration img-login'>
                    
                </section>
            </div>


        </>
    )
}

export default Login