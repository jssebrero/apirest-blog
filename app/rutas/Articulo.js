    import {Router} from 'express';
    import { RutasArticulos } from '../controladores/Articulo.js';

    //Instancia de Router
    const router = Router();

    const rutaArticulos = new RutasArticulos();

    // Ruta de prueba
    router.get("/ruta-de-prueba", rutaArticulos.prueba);

    router.post("/articulo", rutaArticulos.almacenar);

    router.get("/articulos/:totalMostrar?", rutaArticulos.listar);

    router.get("/articulo/:id", rutaArticulos.listarArticulo);

    router.delete("/articulo/:id", rutaArticulos.eliminar);
    
    // Exportar el router
    export default router;