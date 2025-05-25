import md5 from "crypto-js/md5"
import "./HQs.css"

import { useState, useEffect } from "react"

const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY

export const HQs = () => {
    const [comics, setComics] = useState([])
    const [page, setPages] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try{    
            setLoading(true)

            const ts = Date.now().toString()
            const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString()

            const offset = page * 20

            const url = `https://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`

            const res = await fetch(url)

            const data = await res.json()
            console.log(data)

            //setComics((prev) => [...prev, ...data.data.results])

            setComics((prev) => {
                const idsExistentes = new Set(prev.map(m => m.id))
                const novos = data.data.results.filter(m => !idsExistentes.has(m.id))
                return [...prev, ...novos]
            })
        }   
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(hasMore) fetchData()
       
    }, [page])

    useEffect(() => {
        if(!hasMore) return

        const observer = new IntersectionObserver(
            entries => {
                if(entries[0].isIntersecting){
                    setPages(prev => prev + 1)
                }
            },
            { threshold: 1.0 }
        )

        const sentinel = document.getElementById("sentinelScroll")

        if(sentinel) observer.observe(sentinel)

        return () => {
            if(sentinel) observer.unobserve(sentinel)
        }
    }, [comics, hasMore])


    return(
        <>
            {comics.map(comic => {
            const detailUrl = comic.urls.find(url => url.type === "detail")?.url || "#";

            return (
                <div key={comic.id} className="hqCard">
                <a href={detailUrl} target="_blank" rel="noopener noreferrer">
                    <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    width="200"
                    />
                </a>
                <h2>{comic.title}</h2>
                </div>
            );
            })}

            <div id="sentinelScroll" style={{heigth: "1px"}}>

            </div>

            {loading && (
                <div className="loading">
                    <h1>Carregando...</h1>
                </div>
            )}

        </>
    )
}