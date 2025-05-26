import "./ModalInfo.css"
import { BsXLg, BsHeartFill, BsStarFill } from "react-icons/bs"
import { user } from "../../../contexts/UserContext"
import { useState } from "react"

export const ModalInfo = ({ info, onClose }) => {
    const { userData } = user()
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    console.log(error)

    const title = info?.attributes?.title["en"] || "Sem título";
    const description = info?.attributes?.description?.["en"] || "Sem descrição";
    console.log(info.attributes.title)

    const coverRel = info.relationships.find(rel => rel.type === "cover_art");
    const coverFileName = coverRel?.attributes?.fileName;
    const coverUrl = coverFileName
        ? `https://uploads.mangadex.org/covers/${info.id}/${coverFileName}.512.jpg`
        : "https://via.placeholder.com/300x450";


    //salvar mangá no bd
    const apiSave = 'http://localhost:8080/api/mangaHQs/save'

    const handleSave = async (userId, id, coverUrl, title, description) => {
        console.log(userId)
        try{
             const res = await fetch(apiSave, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userId, id, coverUrl, title, description })
            })

            const data = await res.json()

            if(res.ok){
                setSuccess(data.message)
                console.log(data)
                setError("")
            }
            else{
                setError(data.message)
                setSuccess("")
            }
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <>

            <div key={info.id} className="modalInfo">
                <BsXLg className="closeIcon" onClick={() => onClose(false)} />
                    <div className="contentItem">
                        <div className="dataItem">
                            <div id="topItem">
                                <img src={coverUrl} alt="" />
                            </div>
                             <div id="bottomItem">
                                <h2>{title}</h2>
                                <p><strong>Descrição:</strong> {description}</p>
                                 <div className="btn">
                                    <a href={`https://mangadex.org/title/${info.id}`}
                                    target="_blank" rel="noopener noreferrer">
                                        <button>Ver no MangáDex</button>
                                    </a>
                                    <button onClick={() => handleSave(userData._id, info.id, coverUrl, title, description)}> <BsHeartFill className="heartSave" /> Salvar</button>
                                    
                                    {success && <span className="successMessage msg">{success}</span>}

                                    {error && <span className="errorMessage msg">{error}</span>}
                                    <button> <BsStarFill className="starIcon" />Avaliar</button>
                                </div>
                               
                             </div>
                        </div>
                    </div>
            </div>


        </>
    )
}