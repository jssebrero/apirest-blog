import Articulo from '../modelos/Articulo.js'
import { Validar } from '../helpers/validar.js';

export class RutasArticulos {

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

        //res.setHeader('Content-Type', 'application/json');

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

        //Mensaje de resultado satisfactorio
        //return res.status(200).json(parametros);
        return res.status(200).json({
                status: "Exito",	
                mensaje: parametros
            });

    }

    async listar(req, res) {
        try {

            let hayTotalMostar = req.params.totalMostrar && req.params.totalMostrar > 0 && req.params.totalMostrar !== undefined ? true : false;
            
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
                data:{status: "Exito",
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

}