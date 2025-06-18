    import {Router} from 'express';
    import { RutasArticulos } from '../controladores/Articulo.js';
    import multer from 'multer';

    //Instancia de Router
    const router = Router();

    const almacenamiento = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './imagenes/articulos/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const subidas = multer({
        storage: almacenamiento,
        limits: { fileSize: 5000000 }, // 5 MB
        fileFilter: (req, file, cb) => {
                cb(null, true);
        }
    });

    const rutaArticulos = new RutasArticulos();

    // Ruta de prueba
    router.get("/ruta-de-prueba", rutaArticulos.prueba);

    router.post("/articulo", rutaArticulos.almacenar);

    router.get("/articulos/:totalMostrar?", rutaArticulos.listar);

    router.get("/articulo/:id", rutaArticulos.listarArticulo);

    router.delete("/articulo/:id", rutaArticulos.eliminar);

    router.put("/articulo/:id", rutaArticulos.editar);

    router.patch("/subir-imagen/:id", [subidas.single("imagen")] ,rutaArticulos.subir);

    router.get("/imagen/:fichero", rutaArticulos.obtenerImagen);
    
    router.get("/buscar/:busqueda", rutaArticulos.buscador);
    // Exportar el router
    export default router;