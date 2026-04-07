const mongoose = require("mongoose")
const productsSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      default: ""
    },
    categoria: {
      type: String,
      required: true,
      enum: ["hombre", "mujer", "accesorios"],
    },
    subcategoria: {
      type: String
    },
    talla: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL'],
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    }
  });
  module.exports = mongoose.model("Product", productsSchema)