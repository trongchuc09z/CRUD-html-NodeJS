### Cách cài đặt và khởi chạy
- Project này của em sử dụng VSCode để làm công cụ lập trình
- Project này sử dụng các công nghệ sau cho backend: expressjs, mysql2
- Yêu cầu: 
	- Đã cài đặt nodejs trong máy.
	- Đã cài đặt VSCode trong máy.
	- Đã cài đặt Extension **Live Server**
	- Đã cài đặt MySQL trên máy tính
- Khởi chạy: Chạy lần lượt theo thứ tự `Back-end -> Front-end`
### Back-end
- **Cài đặt môi trường:**  chạy lần lượt các lệnh sau trên Terminal
	- ```cd BE```
	- ```npm install express mysql2 dotenv cors```
	- Tạo một schema có tên: ```ltm```
	- Sửa lại trong file ```.env``` các thông tin phù hợp
		- ```shell
			DB_HOST=localhost
			DB_USER=root
			DB_PASSWORD=<Password MySQL>
			DB_NAME=ltm
			PORT=3000<Port thay đổi tuỳ ý>
			```

- **Khởi chạy**
	- Tại terminal, chạy lần lượt các lệnh
		- ```cd BE(nếu đã trỏ vào thư mục BE thì bỏ qua bước này)```
		- ```npm run dev```

### Front-end
- **Khởi chạy**
	- Yêu cầu: Cài extension **Live Server** của VSCode
	- Chuột phải vào file **index.html**, chọn **Open with LiveServer**

