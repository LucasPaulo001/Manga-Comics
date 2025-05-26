import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    /*data_nascimento: { type: Date, default: Date.now, required: true },*/
    isAdmin: { type: Boolean, default: false },
    mangaSaved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manga' }],
    
});

export default mongoose.model("User", UserSchema);