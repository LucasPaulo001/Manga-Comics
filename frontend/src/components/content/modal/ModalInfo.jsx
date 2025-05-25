import "./ModalInfo.css"
import { BsXLg } from "react-icons/bs"

export const ModalInfo = ({ info, onClose }) => {
    const title = info?.attributes?.title["en"] || "Sem título";
    const description = info?.attributes?.description?.["en"] || "Sem descrição";
    console.log(info.attributes.title)

    const coverRel = info.relationships.find(rel => rel.type === "cover_art");
    const coverFileName = coverRel?.attributes?.fileName;
    const coverUrl = coverFileName
        ? `https://uploads.mangadex.org/covers/${info.id}/${coverFileName}.512.jpg`
        : "https://via.placeholder.com/300x450";

    return (
        <>

            <div key={info.id} className="modalInfo">
                <BsXLg onClick={() => onClose(false)} />
                    <div className="contentItem">
                        <div className="dataItem">
                            <div id="topItem">
                                <img src={coverUrl} alt="" />
                            </div>
                             <div id="bottomItem">
                                <h2>{title}</h2>
                                <p>{description}</p>
                             </div>
                        </div>

                        <div className="btn">
                            <button>Salvar</button>
                            <button>Avaliar</button>
                        </div>
                    </div>
            </div>


        </>
    )
}