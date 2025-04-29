import mongoose from 'mongoose';

const conexion = async() => {
    try {

        //await mongoose.connect("mongodb://admin:password@apirest-blog-mongodb-1:27017/mi_blog");
        await mongoose.connect("mongodb://admin:password@mongodb");
        
        
        console.log("Conexion realizada con exito");

    }
    catch(error){
        console.error(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
};

export default conexion;