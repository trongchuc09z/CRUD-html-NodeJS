const API_URL = 'http://localhost:3000/products';

let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    // Thêm sự kiện cho nút tìm kiếm
    document.getElementById('searchBtn').addEventListener('click', () => {
        searchProducts();
    });

    // Thêm sự kiện khi nhấn Enter trong ô tìm kiếm
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });

    document.getElementById('addBtn').addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;

        if (!name || price === "" || stock === "") {
            showMessage('Vui lòng nhập đầy đủ thông tin!', true);
            return;
        }

        try {
            await fetch(API_URL, { // Gửi yêu cầu POST đến server để thêm sản phẩm
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // Định dạng dữ liệu gửi đi là JSON    
                body: JSON.stringify({ name, price, stock }) // Chuyển đổi dữ liệu thành chuỗi JSON
            });

            document.getElementById('productForm').reset();
            showMessage('Thêm sản phẩm thành công!');
            loadProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            showMessage('Lỗi khi thêm sản phẩm!', true);
        }
    });

    document.getElementById('updateBtn').addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;

        if (!name || price === "" || stock === "") {
            showMessage('Vui lòng nhập đầy đủ thông tin!', true);
            return;
        }

        try {
            await fetch(`${API_URL}/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price, stock })
            });

            document.getElementById('productForm').reset();
            showMessage('Cập nhật sản phẩm thành công!');
            editingId = null;
            document.getElementById('updateBtn').disabled = true;
            document.getElementById('addBtn').disabled = false;
            loadProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            showMessage('Lỗi khi cập nhật sản phẩm!', true);
        }
    });

    // Add event listener for cancel button
    document.getElementById('cancelBtn').addEventListener('click', function () {
        // Reset the form
        document.getElementById('productForm').reset();

        // Reset editing state
        editingId = null;

        // Enable add button and disable update button
        document.getElementById('updateBtn').disabled = true;
        document.getElementById('addBtn').disabled = false;

        // Hide cancel button
        document.getElementById('cancelBtn').style.display = 'none';

        showMessage('Đã hủy cập nhật!');
    });
});

window.deleteProduct = async function (id) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            const updatedProducts = await response.json();

            showMessage('Đã xóa sản phẩm!');

            // Hiển thị danh sách sản phẩm đã cập nhật
            displayProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
            showMessage('Lỗi khi xóa sản phẩm!', true);
        }
    }
};

window.editProduct = function (id, name, price, stock) {
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('stock').value = stock;
    editingId = id;
    document.getElementById('updateBtn').disabled = false;
    document.getElementById('addBtn').disabled = true;
    document.getElementById('cancelBtn').style.display = 'block'; // Show cancel button
};

function showMessage(msg, isError = false) {
    const div = document.getElementById('message');
    div.innerText = msg;
    div.style.color = isError ? 'red' : 'green';
    setTimeout(() => { div.innerText = ''; }, 2000);
}

async function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.trim();

    if (searchTerm === '') {
        loadProducts(); // Nếu ô tìm kiếm trống, hiển thị tất cả sản phẩm
        return;
    }

    try {
        // gần giống hàm load()
        const res = await fetch(`${API_URL}?search=${encodeURIComponent(searchTerm)}`); // Gửi yêu cầu GET đến server với tham số tìm kiếm
        const products = await res.json();
        displayProducts(products);
    } catch (error) {
        showMessage('Lỗi khi tìm kiếm sản phẩm!', true);
        console.error('Search error:', error);
    }
}

// Tách hàm hiển thị sản phẩm để tái sử dụng
function displayProducts(products) { // xóa dữ liệu cũ và hiển thị danh sách sản phẩm mới
    const tbody = document.getElementById('productList');
    tbody.innerHTML = '';

    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center">Không tìm thấy sản phẩm nào</td></tr>';
        return;
    }

    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td> 
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id}, '${product.name}', ${product.price}, ${product.stock})">Sửa</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function loadProducts() { // Hiển thị danh sách sản phẩm tải lên từ database
    const res = await fetch(API_URL); // Gửi yêu cầu GET đến server để lấy danh sách sản phẩm
    const products = await res.json();
    displayProducts(products);
}



