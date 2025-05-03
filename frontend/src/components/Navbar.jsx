import { Link } from "react-router-dom"
import "./Navbar.css"

//Icones
import { BsSearch, BsFillPersonFill } from "react-icons/bs"

const Navbar = () => {
  return (
    <div className="navbar">
        <Link to={'/'}>
          <span id="logo">Manga Comics</span>
        </Link>
        <form>
          <div className="inputAction">
              <input 
              type="text" 
              placeholder="Busque por algo..."
              />
              <BsSearch className="iconInput"/>
          </div>
        </form>
        <span>
          <BsFillPersonFill className="icon"/>
        </span>
    </div>
  )
}

export default Navbar