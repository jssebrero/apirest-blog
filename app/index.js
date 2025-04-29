import conexion from './basedatos/conexion.js';
import express from 'express';
import cors from 'cors';
import router from './rutas/Articulo.js'

console.log("App de node iniciada");
const puerto = 3000;
conexion();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/", router);
//rutas
app.get("/probando", (req, res) => {
    console.log("Se ejecuto el endpoint probando");

    return res.status(200).send('prueba con exito 2');
});

//Servidor y escucha de peticiones http
app.listen(puerto, ()=>{
    console.log("Servidor a la escucha del puerto " + puerto);
});