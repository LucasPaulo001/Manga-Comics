import mongoose, { Schema } from "mongoose";

const MangaSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    coverUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Sem descrição"
    },
    avaliations: [{
        comment: {  
            type: String,
            requred: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Manga", MangaSchema);