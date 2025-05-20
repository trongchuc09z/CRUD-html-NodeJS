const pool = require('../config/db');

const Product = {
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: String,
        allowNull: false
    },
    price: {
        type: Number,
        allowNull: false
    },
    stock: {
        type: Number,
        allowNull: false
    },
    createdAt: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now
    },
    updatedAt: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now
    }
};

module.exports = {
    createProduct: async (product) => {
        const [rows] = await pool.query('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [product.name, product.price, product.stock]);
        return rows;
    },
    getProducts: async () => {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    },
    getProductById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows;
    },
    updateProduct: async (id, product) => {
        const [result] = await pool.query(
            'UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?',
            [product.name, product.price, product.stock, id]
        );
        return result; // result.affectedRows sẽ cho biết có cập nhật được không
    },

    deleteProduct: async (id) => {
        const [rows] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        return rows;
    },

    // Thêm hàm reset ID
    resetAutoIncrement: async () => {
        // Tạo bảng tạm thời
        await pool.query('CREATE TEMPORARY TABLE temp_products SELECT * FROM products ORDER BY id');
        // Xóa dữ liệu từ bảng chính
        await pool.query('TRUNCATE TABLE products');
        // Reset auto increment
        await pool.query('ALTER TABLE products AUTO_INCREMENT = 1');
        // Chèn lại dữ liệu từ bảng tạm thời
        await pool.query('INSERT INTO products (name, price, stock) SELECT name, price, stock FROM temp_products');
        // Xóa bảng tạm thời
        await pool.query('DROP TEMPORARY TABLE temp_products');

        // Lấy dữ liệu mới
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    },
    searchProducts: async (searchTerm) => {
        const [rows] = await pool.query(
            'SELECT * FROM products WHERE name LIKE ? OR id LIKE ?',
            [`%${searchTerm}%`, `%${searchTerm}%`]
        );
        return rows;
    }
};



