const express = require('express');
const dotenv = require('dotenv');
dotenv.config();// lectura variables entorno
const helmet = require('helmet');
const cors = require("cors");
const methodOverride = require('method-override');
const Product = require('./models/Products')
const session = require('express-session');
const multer = require('multer');
const app = express();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productApiRoutes");


const productApiRoutes = require('./routes/productApiRoutes');


const {dbConnection} = require('./config/db');


app.use(cors({
  origin: "*" // permitir todos los origenes

}));
app.use(helmet({contentSecurityPolicy: false,}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); 
app.use(session({//para guardar los datos en sesion 
  secret: "mi_secret",
  resave: false,
  saveUninitialized: false,
}),);

app.use(express.static('public'));

dbConnection();

/*app.get("/api/products", async (req, res) => {
  const { categoria, subcategoria } = req.query;

  const filter = {};

  if (categoria) filter.categoria = categoria;
  if (subcategoria) filter.subcategoria = subcategoria;
  const products = await Product.find(filter);

  res.json(products);
}); */
app.use("/api/auth", authRoutes);
app.use('/api/products', productApiRoutes);
app.use((err, req, res, next) => {
  //  errores propios de multer
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.send(
          "La imagen supera el tamaño máximo permitido",
        );
      case "LIMIT_FILE_COUNT":
        return res.send("Has subido demasiados archivos");
      case "LIMIT_UNEXPECTED_FILE":
        return res.send(
          "Campo de imagen incorrecto o archivo inesperado");
      case "LIMIT_PART_COUNT":
        return res.send("Demasiadas partes en el formulario");
      case "LIMIT_FIELD_KEY":
        return res.send("Nombre de campo demasiado largo");
      case "LIMIT_FIELD_VALUE":
        return res.send("Valor de campo demasiado grande");
      case "LIMIT_FIELD_COUNT":
        return res.send("Demasiados campos en el formulario");
      default:
        return res.send(err.message);
    }
  }
  //  error de formato no permitido (fileFilter)
  if (err && err.message) {
    return res.send(err.message);
  }
  next();
})

app.listen(process.env.Mongo_URI || 4000,()=>{
    console.log(`server listen in port http://localhost:${process.env.PORT || 4000}`)
});



module.exports = app;