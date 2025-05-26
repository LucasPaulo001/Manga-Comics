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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Manga", MangaSchema);