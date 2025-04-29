    import {Router} from 'express';
    import { RutasArticulos } from '../controladores/Articulo.js';

    //Instancia de Router
    const router = Router();

    const rutaPueba = new RutasArticulos();

    // Ruta de prueba
    router.get("/ruta-de-prueba", rutaPueba.prueba);

    router.post("/articulo", rutaPueba.almacenar);
    
    // Exportar el router
    export default router;