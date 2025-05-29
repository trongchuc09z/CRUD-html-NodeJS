require('dotenv').config(); // Tải các biến môi trường từ file .env
const express = require('express'); // import express
const app = express(); 
const port = process.env.PORT; 
const productsRoute = require('./routes/products.route'); // import file products.route.js
const cors = require('cors');  // import cors


app.use(express.json());
app.use(cors());

app.use('/products', productsRoute); // sử dụng route productsRoute cho đường dẫn /products

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
