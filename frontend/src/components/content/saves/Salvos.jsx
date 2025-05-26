import "./Salvos.css"
import { useState, useEffect } from "react"
import { user } from "../../../contexts/UserContext"

export const Salvos = () => {
    const [saved, setSaved] = useState([])
    const { userData } = user()
    const userId = userData._id

    const apiListSaves = `http://localhost:8080/api/mangaHQs/mangaSaved/${userId}`

    const fetchSaved = async () => {
        try{
            const res = await fetch(apiListSaves)

            const data = await res.json()

            if(res.ok){
                console.log(data.savedManga)
                setSaved(data.savedManga)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSaved()
    }, [])

    return(
        <>
            <div className="salvos-lista">
                <div>
                    <h1>Mangás Salvos</h1>
                    <span className="line lineSaves"></span>
                </div>
                <div className="list">
                    {saved.map((manga) => (
                        <div key={manga._id} className="manga-card">
                            <div className="image">
                                <img src={manga.coverUrl} alt={manga.title} />
                            </div>
                            <div className="data">
                                <h3>{manga.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}