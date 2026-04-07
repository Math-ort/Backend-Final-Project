const express = require('express');
const router = express.Router();

const productApiController = require('../config/controllers/productApiController');
// const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadCloudinaryMiddleware');

router.get('/', productApiController.getAllProducts);
router.get('/:id', productApiController.getProductById);
router.post('/', upload.single("imagen"), productApiController.createProduct); 
router.put('/:id', upload.single("imagen"), productApiController.updateProduct);
router.delete('/:id', productApiController.deleteProduct);

module.exports = router;