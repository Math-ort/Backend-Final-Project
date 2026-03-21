const express = require('express');
const router = express.Router();

const productApiController = require('../controllers/productApiController');
// const auth = require('../../middlewares/authMiddleware');
// const upload = require('../../middlewares/uploadCloudinaryMiddleware');

router.get('/', productApiController.getAllProducts);
router.get('/:id', productApiController.getProductById);
router.post('/',  productApiController.createProduct); 
router.put('/:id', productApiController.updateProduct);
router.delete('/:id', productApiController.deleteProduct);

module.exports = router;