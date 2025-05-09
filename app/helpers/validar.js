import validator from 'validator';

export class Validar {

    static articulo(parametros) {

        
        let validarTitulo =  !validator.isEmpty(parametros.titulo);
        let validarContenido = !validator.isEmpty(parametros.contenido);

        if(!validarTitulo || !validarContenido){

            
            throw new Error("informacion no valida");
            
        }
    }

}