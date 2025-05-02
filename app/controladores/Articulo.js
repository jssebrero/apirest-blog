import validator from 'validator';
import Articulo from '../modelos/Articulo.js'

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

        //Validar datos
        try {

            let validarTitulo =  !validator.isEmpty(parametros.titulo);
            let validarContenido = !validator.isEmpty(parametros.contenido);

            if(!validarTitulo || !validarContenido){

                throw new Error("informacion no valida");
                console.log("Error en la validacion de datos");

            }

            
        } catch (error) {
            return res.status(400).json({
                status: "Error",
                mensaje: "datos invalidos"
            });
        }

        //Crear objeto a guardar
        const articulo = new Articulo(parametros);

        //Asiganr varlores al objeto basado en el modelo


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

    }

    async listar(req, res) {
        try {
            const articulos = await Articulo.find({}).sort({ fecha: -1 });
    
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
            return res.status(500).json({
                status: "Error",
                mensaje: "Error al obtener los artículos"
            });
        }
    }

}