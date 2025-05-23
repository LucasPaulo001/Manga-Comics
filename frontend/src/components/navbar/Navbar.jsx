
import "./Navbar.css"

const Navbar = () => {
    return(
        <>
            <div className="navbar">
                <div>
                    <h1>Manga Comics</h1>
                </div>
                <div>
                    <form>
                        <div className="input">
                            <input className="inputPadrao" 
                            type="text" 
                            placeholder="Busque por algo..."
                            />
                        </div>    
                    </form>
                </div>
                <div>
                    Perfil
                </div>
            </div>
        </>
    )
}

export default Navbar