const express = require('express');
const router = express.Router();
const { getProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } = require('../controllers/products.controller');

router.get('/', getProductsController);

router.get('/:id', getProductByIdController);

router.post('/', createProductController);

router.put('/:id', updateProductController);

router.delete('/:id', deleteProductController);

module.exports = router;
