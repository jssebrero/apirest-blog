import {Schema, model} from 'mongoose';
import _default from 'validator';

const ArticuloSchema = Schema({
    titulo: {
        type: String,
        required: true,
    },
    contenido: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    }, 
    imagen: {
        type: String,
        default: ""
    }
});

//module.exports = model('Articulo', ArticuloSchema);
export default model('Articulo', ArticuloSchema);