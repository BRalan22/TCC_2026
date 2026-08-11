import express from "express";
import Productsroutes from "./routes/Productsroutes.js";
import connectDatabase from "./database/connection.js";
connectDatabase()
const app = express();

console.log("ESTE É O SERVER.TS DA TECHSTORE");

const PORT = 3001;
app.use(express.json());

app.use("/product", Productsroutes)
console.log("Rotas de produtos carregadas");

app.get("/", (req, res) => {
    res.json({
        message: "API está funcionando! "
    });
});

app.get("/teste", (req, res) => {
    res.send("Servidor de teste funcionando!");
});



const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
