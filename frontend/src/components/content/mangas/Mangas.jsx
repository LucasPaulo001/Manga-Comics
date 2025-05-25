import "./Mangas.css"
import { useState, useEffect } from "react"
import { useSearch } from "../../../contexts/SearchContext"

//const apiMangas = 'https://api.mangadex.org/manga?contentRating[]=safe&limit=100&includes[]=cover_art';


export const Mangas = () => {
    const { searchTerm } = useSearch()
    const [mangas, setMangas] = useState([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(null)
    console.log("Buscando página", page)

    const fetchMangas = async () => {
        try {

            setLoading(true) 
            

            const urlBase = 'https://api.mangadex.org/manga'

            //Formatação de queryParams para a busca
            const queryParams = new URLSearchParams({
                limit: 20,
                offset: page * 10,
                "includes[]": "cover_art",
                "contentRating[]": "safe"
            })

            if (searchTerm) {
                queryParams.set("title", searchTerm)
            }

            const url = `${urlBase}?${queryParams.toString()}`

            const res = await fetch(url)

            const resJson = await res.json()

            if (resJson.data.length === 0) {
                setHasMore(false);
                return;
            }

            console.log(resJson.data)

            setMangas((prev) => {
                const idsExistentes = new Set(prev.map(m => m.id))
                const novos = resJson.data.filter(m => !idsExistentes.has(m.id))
                return [...prev, ...novos]
            })
        }
        catch (error) {
            console.error("Erro na requisição", error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if (hasMore) fetchMangas()
    }, [page])

    useEffect(() => {
        setPage(0);
        setMangas([]);
        setHasMore(true);
    }, [searchTerm])

    //Scroll infinito
    useEffect(() => {
        if (!hasMore) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        ) 

        const sentinel = document.getElementById("sentinelaScroll")
        
        if (sentinel) observer.observe(sentinel)

        return () => {
            if(sentinel) observer.unobserve(sentinel)   
        }
    }, [mangas, hasMore])

    return (
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
                        <a href={`https://mangadex.org/title/${manga.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img className="imgCapa" src={coverUrl} alt={title} />
                        </a>
                        <p>{title}</p>
                    </div>
                );

            })}
            <div id="sentinelaScroll" style={{ height: "1px" }}></div>

            {loading && (
                <div className="loading">
                    <h1>Carregando...</h1>
                </div>
            )}
            
        </>
    )
}