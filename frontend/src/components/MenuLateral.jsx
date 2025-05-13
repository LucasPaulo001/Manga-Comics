import './MenuLateral.css'
import image from '../assets/images/background.jpg'
import { BsGear, BsBoxArrowRight } from "react-icons/bs"
import { logout, reset } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

const MenuLateral = ({ status: menuStatus }) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())

        navigate('/login')
    }

    return(
        <div className='contentMenu' >
            <img src={image} alt="" />
            <div className='items'>
                <li className='settings'>
                    <BsGear className='iconM'/>Configurações
                </li>
                <li onClick={handleLogout} className='logout'>
                    <BsBoxArrowRight className='iconM'/>Sair
                </li>
            </div>
        </div>
    )
}

export default MenuLateral