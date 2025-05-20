const productsModel = require('../models/products.model');

const getProductsController = async (req, res) => {
    try {
        const searchTerm = req.query.search;
        let products;

        if (searchTerm) {
            products = await productsModel.searchProducts(searchTerm);
        } else {
            products = await productsModel.getProducts();
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsModel.getProductById(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
};

const createProductController = async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const product = await productsModel.createProduct({ name, price, stock });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
};

const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        const result = await productsModel.updateProduct(id, { name, price, stock });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật' });
        }
        res.json({ id, name, price, stock });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};
const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await productsModel.deleteProduct(id);

        // Reset ID sau khi xóa
        const updatedProducts = await productsModel.resetAutoIncrement();

        res.json(updatedProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

module.exports = {
    getProductsController,
    getProductByIdController,
    createProductController,
    updateProductController,
    deleteProductController
};


