import mongoose, { Schema } from "mongoose";

const MangaSchema = new Schema({
    titulo: { 
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    genero: {
        type: [ String ],
        required: true
    },
    capa: {
        type: String,
        required: true
    },
    sinopse: {
        type: String,
    },
    capitulos: [{
        numero: Number,
        titulo: String,
        imagem: [ String ]
    }],
    notaMedia: {
        type: Number,
        default: 0
    },
    totalAvaliacoes: {
        type: Number,
        default: 0
    },
    avaliacoes: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        nota: {
            type: Number,
            min: 0,
            max: 10,
        },
        comentario: { type: String }
    }],
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Manga", MangaSchema);