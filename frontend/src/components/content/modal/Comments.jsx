import { user } from "../../../contexts/UserContext"
import "./Comments.css"
import { useState, useEffect } from "react"

import { BsFillHandThumbsUpFill } from "react-icons/bs"

export const Comments = ({title, mangaId}) => {
    const [comment, setComment] = useState("")
    const [listComments, setListComments] = useState([])
    const [error, setError] = useState("")
    const { userData } = user()
    const userId = userData._id

    console.log(userData.mangaSaved)


    const handleComment = async (e) => {
        e.preventDefault()
        const apiComment = 'http://localhost:8080/api/mangaHQs/comment'

        try{

            const res = await fetch(apiComment, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userId, mangaId, comment })
            })

            const data = await res.json()

            if(res.ok){
                setComment("")
                setListComments(prev => [...prev, data.newComment])
            }
            else{
                setError(data.message)
            }

        }
        catch(error){
            console.log(error)
        }
    }

    //Listando comentários
    const fetchData = async () => {
        const apiList = `http://localhost:8080/api/mangaHQs/listComments/${mangaId}`

        try{

            const res = await fetch(apiList)

            const data = await res.json()

            setListComments(data.comments)

        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [comment])

    return(
        <>
            {error && <span className="errorMessage msg">{error}</span>}
            <form onSubmit={handleComment} className="formComment">
                <div className="localInput"> 
                    <input 
                    className="inputPadrao" 
                    type="text" placeholder={`Comentar sobre a obra "${title}"`} 
                    onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit" className="sendBtn">Enviar</button>
            </form>
            <div className="comentarios">
                {listComments ? listComments.map((com, i) => (
                    <>
                        <div key={i} className="commentItem">
                            <p>
                                <strong>{com.author?.nome || "Usuário"}</strong>: {com.comment}
                            </p>
                            <span>
                                <BsFillHandThumbsUpFill />
                            </span>
                        </div>
                        <hr />
                    </>
                )) :
                    <h2>Não há comentários por aqui...</h2>
                }
            </div>
        </>
    )
}