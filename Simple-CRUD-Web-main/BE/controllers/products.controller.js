const productsModel = require('../models/products.model');

const getProductsController = async (req, res) => {
    try {
        const searchTerm = req.query.search;// Lấy từ khóa tìm kiếm từ query string (nếu có)
        let products; // Biến để lưu danh sách sản phẩm

        if (searchTerm) {
            products = await productsModel.searchProducts(searchTerm); // Tìm kiếm sản phẩm nếu có từ khóa tìm kiếm
        } else {
            products = await productsModel.getProducts(); // Lấy tất cả sản phẩm nếu không có từ khóa tìm kiếm
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

const getProductByIdController = async (req, res) => { // Controller xử lý yêu cầu lấy thông tin một sản phẩm theo ID
    try {
        const { id } = req.params; // Lấy ID sản phẩm từ URL parameters
        const product = await productsModel.getProductById(id); //  Lấy thông tin sản phẩm từ model
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
};

const createProductController = async (req, res) => { // Controller xử lý yêu cầu tạo sản phẩm mới
    try {
        const { name, price, stock } = req.body; // Lấy thông tin sản phẩm từ body của request
        const product = await productsModel.createProduct({ name, price, stock }); // Tạo sản phẩm mới trong model
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
};

const updateProductController = async (req, res) => { // Controller xử lý yêu cầu cập nhật thông tin sản phẩm
    try {
        const { id } = req.params;// Lấy ID sản phẩm từ URL parameters
        const { name, price, stock } = req.body;// Lấy thông tin cập nhật từ body của request   
        const result = await productsModel.updateProduct(id, { name, price, stock }); // Cập nhật thông tin sản phẩm trong model    
        res.json({ id, name, price, stock });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};
const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await productsModel.deleteProduct(id); // Xóa sản phẩm trong model
        const updatedProducts = await productsModel.getProducts();
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


