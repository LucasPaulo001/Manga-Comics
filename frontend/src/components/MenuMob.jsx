import './MenuMob.css'
import { BsGear, BsBoxArrowRight } from "react-icons/bs"
import image from '../assets/images/background.jpg'

const MenuMob = ({ status }) => {
    console.log(status)
    return(
        <div className={status ? 'menuMob' : 'desative'}>
            <img src={image} alt="" />
            <div className='itemsMob'>
                <li className='settings'>
                    <BsGear className='iconM'/>Configurações
                </li>
                <li className='logout'>
                    <BsBoxArrowRight className='iconM'/>Sair
                </li>
            </div>
        </div>
    )
}

export default MenuMob