const http = require('http');
const fs = require('fs');
const url = require('url');

// --- DATABASE GIẢ LẬP (Nơi lưu dữ liệu tạm) ---
let database = [
    { ten: "Admin", loiNhan: "Chuc mung ban da deploy thanh cong!" }
];

const server = http.createServer((req, res) => {
    // Cấu hình CORS để Frontend gọi được
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const parsedUrl = url.parse(req.url, true);

    // Xử lý yêu cầu OPTIONS (cho trình duyệt check trước khi gửi POST)
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 1. Trả về giao diện chính
    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("Loi file index.html");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        });
    }
    // 2. API Đồng hồ (Giờ Việt Nam)
    else if (req.method === 'GET' && parsedUrl.pathname === '/api/time') {
        const time = new Date().toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ gioHienTai: time }));
    }
    // 3. API Lấy danh sách Lưu bút
    else if (req.method === 'GET' && parsedUrl.pathname === '/api/database') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(database));
    }
    // 4. API Gửi Lưu bút mới (POST)
    else if (req.method === 'POST' && parsedUrl.pathname === '/api/them-moi') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                // Lưu vào mảng database
                database.push(data);
                
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: "Thanh cong!" }));
            } catch (e) {
                res.writeHead(400);
                res.end("Loi du lieu gui len");
            }
        });
    }
    else {
        res.writeHead(404);
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server Full Chuc Nang dang chay...");
});