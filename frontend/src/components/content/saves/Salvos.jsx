import "./Salvos.css"
import { useState, useEffect } from "react"
import { user } from "../../../contexts/UserContext"
import { BsTrashFill } from "react-icons/bs"

export const Salvos = () => {
    const [saved, setSaved] = useState([])
    const { userData } = user()
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const userId = userData._id

    const apiListSaves = `http://localhost:8080/api/mangaHQs/mangaSaved/${userId}`

    const fetchSaved = async () => {
        try {
            const res = await fetch(apiListSaves)

            const data = await res.json()

            if (res.ok) {
                console.log(data.savedManga)
                setSaved(data.savedManga)
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    const handleRemove = (userId, mangaId) => {
        const apiRemove = 'http://localhost:8080/api/mangaHQs/mangaRemove'

        const fetchRemove = async () => {
            try {
                const res = await fetch(apiRemove, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ userId, mangaId })
                })

                const data = await res.json()

                if (!res.ok) {
                    setError("Obra removida com sucesso!")
                    return
                }

                setSuccess(data.message)
                setSaved((prev) => prev.filter(m => m._id !== mangaId))
                setError("")
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchRemove()

    }

    useEffect(() => {
        fetchSaved()

    }, [])

    return (
        <>
            <div className="salvos-lista">
                <div>
                    <h1>Mangás Salvos</h1>
                    <span className="line lineSaves"></span>
                    {success && <span className="successMessage msg">{success}</span>}
                </div>
                
                {saved.length > 0 ? <div className="list">
                    {saved.map((manga) => (
                        <div key={manga._id} className="manga-card">
                            <div className="image">
                                <img src={manga.coverUrl} alt={manga.title} />
                            </div>
                            <div className="data">
                                <h3>{manga.title}</h3>
                            </div>
                            <button onClick={() => handleRemove(userId, manga._id)} className="btnInteract">
                                <BsTrashFill />
                            </button>
                        </div>

                    ))}
                </div> :

                    <h2>Você ainda não salvou nenhuma obra!</h2>

                }
            </div>


        </>
    )
}