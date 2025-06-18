import Articulo from '../modelos/Articulo.js'
import { Validar } from '../helpers/validar.js';
import fs from 'fs';
import path from 'path';

export class RutasArticulos {

    codigoRespuesta = 200;
    statusRespuesta = "Exito";
    mensajeRespuesta = "";
    data;
    respuesta = {
        status: "Error",
        mensaje: "",
        data: "",
    };

    prueba (req, res){

        return res.status(200).json({
            mensaje: "Soy un accion de prueba"
        });

    }

    curso(req, res){

        return res.status(200).json({
            curso: "Soy un cusro",
            autor: "Juan sebrero"
        });

    }

    almacenar(req, res){

        //Recoger parametros que se almacenaran
        let parametros = req.body;

        Validar.articulo(parametros);

        //Crear objeto a guardar
        const articulo = new Articulo(parametros);

        //Almacenar el articulo
        articulo.save()
            .then(articuloGuardado => {
                // El documento se guardó correctamente
                console.log('Artículo guardado:', articuloGuardado);

                return res.status(200).json({
                    status: "Exito",
                    articulo: articuloGuardado
                });

            })
            .catch(error => {
                // Ocurrió un error al guardar
                console.log('Error al guardar el artículo:', error);
                return res.status(400).json({
                    status: "Error",
                    mensaje: "Error al guardar articulo"
                });
            });

    }

    async listar(req, res) {
        try {

            let hayTotalMostar = !!(req.params.totalMostrar && req.params.totalMostrar > 0 && req.params.totalMostrar !== undefined);
            
            const articulos = hayTotalMostar ? await Articulo.find({}).limit(1) : await Articulo.find({});
    
            if (!articulos || articulos.length === 0) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No hay articulos para mostrar"
                });
            }
    
            return res.status(200).json({
                status: "Exito",
                articulos
            });
        } catch (error) {
            console.error("Error al listar artículos:", error);
            return res.status(400).json({
                status: "Error",
                mensaje: "Error al obtener los artículos"
            });
        }
    }

    async listarArticulo(req, res) {
        try {
            const id = req.params.id;
            const articulo = await Articulo.findById(id);
    
            if (!articulo) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No se encontró el artículo"
                });
            }
    
            return res.status(200).json({
                data:{status: "Exito",
                    articulo
                }
            });
        } catch (error) {
            console.error("Error al listar el artículo:", error);
            return res.status(400).json({
                status: "Error",
                mensaje: "Error al obtener el artículo"
            });
        }
    }

    async eliminar(req, res) {
        try {
            const id = req.params.id;
            const articuloEliminado = await Articulo.findByIdAndDelete(id);
    
            if (!articuloEliminado) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No se encontró el artículo para eliminar"
                });
            }
    
            return res.status(200).json(
                {
                    data:{status: "Exito",
                    mensaje: "Artículo eliminado correctamente",
                    articulo: articuloEliminado
                }
            });
        } catch (error) {
            console.error("Error al eliminar el artículo:", error);
            return res.status(400).json({
                status: "Error",
                mensaje: "Error al eliminar el artículo"
            });
        }
    }

    async editar(req, res) {

        try {
            const id = req.params.id;
            const parametros = req.body;

            Validar.articulo(parametros);

            const articuloActualizado = await Articulo.findByIdAndUpdate(id, parametros, { new: true });

            if (!articuloActualizado) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No se encontró el artículo para editar"
                });
            }

            return res.status(200).json({
                data:{status: "Éxito",
                    articulo: articuloActualizado
                }
            });
        } catch (error) {
            console.error("Error al editar el artículo:", error);
            return res.status(400).json({
                status: "Error",
                mensaje: "Error al editar el artículo"
            });
        }

    }

    subir = async(req,res) => {

        if(!req.file && !req.files){

            return res.status(400).json({
                status: "Error",
                mensaje: "No se ha subido ningun archivo"
            });

        }

        let nombreArchivo = req.file.originalname;
        let extensionArchivo = nombreArchivo.split(".")[1];

        if(extensionArchivo == "png" || extensionArchivo == "jpg" || extensionArchivo == "jpeg" || extensionArchivo == "gif"){

            const id = req.params.id;
            
            const articuloActualizado = await Articulo.findByIdAndUpdate(id, {imagen: req.file.filename}, { new: true });

            if (!articuloActualizado) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No se encontró el artículo para editar"
                });
            }

            this.respuesta.status = "Éxito";
            this.respuesta.mensaje = "Imagen subida correctamente";
            this.respuesta.data = {
                articulo: articuloActualizado
            };

            return res.status(this.codigoRespuesta).json(this.respuesta);

        }

        fs.unlink(req.file.path, (error) => {

            return res.status(400).json({
                status: "Error",
                mensaje: "La extension no es valida"
            });

        });

    }

    obtenerImagen = (req, res) =>{

        let fichero = req.params.fichero;
        let rutaImagen = "./imagenes/articulos/" + fichero;

        fs.access(rutaImagen,fs.constants.F_OK, (error) => {

            if(error){

                this.codigoRespuesta = 404;
                this.respuesta.mensaje = "Imagen no encontrada";

                return res.status(this.codigoRespuesta).json(this.respuesta);

            }

            return res.status(200).sendFile(path.resolve(rutaImagen));

        });

    }

    buscador = async(req, res) => {

        let busqueda = req.params.busqueda;

        try {
            const articulosEncontrados = await Articulo.find({
                "$or": [
                    { "titulo": { "$regex": busqueda, "$options": "i" } },
                    { "contenido": { "$regex": busqueda, "$options": "i" } }
                ]
            })
            .sort([['fecha', -1]]) // Cambié 'descending' por un espacio, o usa -1
            .exec(); // <-- ¡CAMBIO CRÍTICO AQUÍ! .exec() sin callback

            if (!articulosEncontrados || articulosEncontrados.length <= 0) {
                this.codigoRespuesta = 404;
                this.respuesta.status = "Error"; // Asegura que el status sea "Error"
                this.respuesta.mensaje = "No se han encontrado articulos";
                this.respuesta.data = null; // Limpia data si no hay artículos
                return res.status(this.codigoRespuesta).json(this.respuesta);
            }

            this.codigoRespuesta = 200;
            this.respuesta.status = "Exito";
            this.respuesta.mensaje = "Artículos encontrados correctamente"; // Añade un mensaje de éxito
            this.respuesta.data = {
                articulos: articulosEncontrados
            };

            return res.status(this.codigoRespuesta).json(this.respuesta);
        } catch (error) {
            // Manejo de errores de Mongoose o de la consulta
            console.error("Error al buscar artículos:", error);
            this.codigoRespuesta = 500; // Error interno del servidor
            this.respuesta.status = "Error";
            this.respuesta.mensaje = "Error al realizar la búsqueda de artículos.";
            this.respuesta.data = null;
            return res.status(this.codigoRespuesta).json(this.respuesta);
        }
    
    }

}