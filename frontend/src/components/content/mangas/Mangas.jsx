import "./Mangas.css"
import { useState, useEffect } from "react"

const apiMangas = 'https://api.mangadex.org/manga?limit=20&includes[]=cover_art'


export const Mangas = () => {
    const [mangas, setMangas] = useState([])

    useEffect(() => {
        const fetchMangas = async () => {
            try{
                const res = await fetch(apiMangas)

                const resJson = await res.json()

                setMangas(resJson.data)
            }
            catch(error){
                console.error("Erro na requisição", error)
            }
        }

        fetchMangas()
    }, [])

    return(
        <>
            {mangas.map((manga) => {
                const titles = manga.attributes.title
                const altTitles = manga.attributes.altTitles
                const relationships = manga.relationships

                // Pega título em pt-br, senão em inglês, senão qualquer outro
                const title =
                titles["pt-br"] ||
                titles["en"] ||
                altTitles.find(t => t["pt-br"])?.["pt-br"] ||
                altTitles.find(t => t["en"])?.["en"] ||
                "Título não disponível";

                // Pega a imagem de capa
                const coverRel = relationships.find(rel => rel.type === "cover_art");
                const coverFileName = coverRel?.attributes?.fileName;
                const coverUrl = coverFileName
                ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.256.jpg`
                : "https://via.placeholder.com/200x300";

            return (
                <div key={manga.id} className="mangaCard">
                    <img src={coverUrl} alt={title} />
                    <p>{title}</p>
                </div>
            );  
                
            })}

                
        </>
    )
}