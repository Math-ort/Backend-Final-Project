const Product = require('../../models/Products');
const productApiController = {

 // GET /api/products
getAllProducts: async (req, res) => {
  try {
     const products = await Product.find();
    res.json({
      ok: true,
      total: products.length,
      data: products
    });
  } catch (error) {
     res.status(500).json({
       ok: false,
       message: "Error getting products"
     });}
 },
  // GET /api/products/:id
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          ok: false,
          message: "Product not found"
        });
      }

      res.json({
        ok: true,
        data: product
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Error getting product"
      });
    }
  },

  // POST
  
  createProduct: async (req, res) => {
    try {
      const productData = {
        ...req.body,
        imagen: req.file ? req.file.path : imagen,
        
      };
  
      const newProduct = await Product.create(productData);
      console.log("FILE:", req.file)
      res.status(201).json({
        ok: true,
        data: newProduct
      });
  
    } catch (error) {
      console.error(error);
      res.status(400).json({
        ok: false,
        message: error.message
      });
    }
  },
  
  // PUT

  updateProduct: async (req, res) => {
    try {
      const updateData = { ...req.body };
  
      
      if (req.file) {
        updateData.imagen = req.file.path;
      }
  
      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({
          ok: false,
          message: "Product not found"
        });
      }
  
      res.json({
        ok: true,
        data: updated
      });
  
    } catch (error) {
      res.status(400).json({
        ok: false,
        message: "Error updating product"
      });
    }
  },
  
  // DELETE

  deleteProduct: async (req, res) => {
    try {
      const deleted = await Product.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          ok: false,
          message: "Product not found"
        });
      }

      res.json({
        ok: true,
        message: "Product deleted successfully"
      });

    } catch (error) {
      res.status(400).json({
        ok: false,
        message: "Error deleting product"
      });
    }
  }

};

module.exports = productApiController;
