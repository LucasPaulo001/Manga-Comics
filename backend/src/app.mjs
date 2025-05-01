//Importando módulos
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./settings/db.mjs";
dotenv.config();

//Configurações

    //Função do express
        const app = express();

    //Tratamento de dados de formulários e json
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));

    //Config. de cors
        app.use(cors());

    //Conexão com o banco de dados
        
        dbConnection(app);
    
    //Importação e configuração de rotas

        import router from "./routes/Router.mjs";

        app.use(router);

//Conectando ao servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Conectado ao servidor na porta: ${PORT}`);
})



