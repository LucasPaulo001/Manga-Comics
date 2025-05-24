import { Outlet } from "react-router-dom"
import { MenuLateral } from "../../components/menuLateral/MenuLateral"
import Navbar from "../../components/navbar/Navbar"
import "./Home.css"

const Home = () => {
    return(
        <>
            <Navbar />
            <div className="contentHome">
                <MenuLateral />
                <div className="contentMain">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Home