import mongoose from "mongoose";

const dbConnection = async (app) => {
    try{
        mongoose.connect(process.env.DB_URI);
        console.log("Conectado ao mongoose!");
    }
    catch(error){
        console.log("ERRO: " + error);
    }
}

export default dbConnection;