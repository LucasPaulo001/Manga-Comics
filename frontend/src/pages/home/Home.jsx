import { MenuLateral } from "../../components/menuLateral/MenuLateral"
import Navbar from "../../components/navbar/Navbar"
import "./Home.css"

const Home = () => {
    return(
        <>
            <Navbar />
            <div className="contentHome">
                <MenuLateral />
                <h1>Home</h1>
            </div>
        </>
    )
}

export default Home