import { Outlet } from "react-router-dom"
import { MenuLateral } from "../../components/menuLateral/MenuLateral"
import "./Home.css"

const Home = () => {
    return(
        <>
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