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

    searchProducts: async (searchTerm) => {
        const [rows] = await pool.query(
            'SELECT * FROM products WHERE name LIKE ? OR id LIKE ?',
            [`%${searchTerm}%`, `%${searchTerm}%`]
        );
        return rows;
    }
};



