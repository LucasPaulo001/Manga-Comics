import { Link, NavLink } from "react-router-dom"
import "./Navbar.css"

//Hooks
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

//Icones
import { BsSearch, BsFillPersonFill, BsList } from "react-icons/bs"
import MenuMob from "./MenuMob"

const Navbar = () => {
  const { auth } = useAuth()
  const { user } = useSelector((state) => state.auth)

  const [menuStatus, setMenuStatus] = useState(null)

  const handleMenu = () => {
    setMenuStatus(menuStatus => !menuStatus)
    console.log(menuStatus)
  }

  return (
    <div className="navbar">
      <BsList className="iconMenu" onClick={handleMenu}/>
       <MenuMob status={menuStatus} />
        <Link to={'/'}>
          <span id="logo">Manga Comics</span>
        </Link>
        {auth ? (
          <>
            <form>
              <div className="inputAction">
                  <input 
                  type="text" 
                  placeholder="Busque por algo..."
                  />
                  <BsSearch className="iconInput"/>
              </div>
            </form>
            {user && (
              <span>
                <NavLink to={`/profile`}>
                  <BsFillPersonFill className="icon"/>
                </NavLink> 
              </span>
              )
            }
          </>
        ) : (
          <>
            
          </>
        )

        }
    </div>
  )
}

export default Navbar