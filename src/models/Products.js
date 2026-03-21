
const mongoose = require('mongoose');

const validCategorias = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];  // enum de colores
const validTallas = ['XS', 'S', 'M', 'L', 'XL'];  

const productsSchema = new mongoose.Schema({
    nombre: {
        type : String,
        requiered : true,
        unique : true,
    },
    descripcion: {
        type : String,
        requiered : true,
    },
    imagen: {
        type : String,
        default : ""
    },
    categoria: {
        type : String,
        requiered : true,
        enum: validCategorias,
    },
    talla: {
        type : String,
        enum: validTallas,
    },
    precio: {
        type : Number,
        requiered : true,
        min: 0,
    }
})

module.exports = mongoose.model('Product', productsSchema);
module.exports.validCategorias = validCategorias;
module.exports.validTallas = validTallas;


