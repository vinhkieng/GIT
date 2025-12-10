const http = require('http');
const fs = require('fs');
const url = require('url');

// --- ĐÂY LÀ DATABASE CỦA CHÚNG TA (Dạng mảng JSON) ---
let database = [
    { ten: "Admin", loiNhan: "Chuc mung ban da deploy thanh cong!" }
];

const server = http.createServer((req, res) => {
    // Cho phép Frontend gọi lên (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        // Trả về file giao diện
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("Khong tim thay file index.html");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        });
    } 
    // API 1: Đọc dữ liệu từ Database (GET)
    else if (req.method === 'GET' && parsedUrl.pathname === '/api/database') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(database));
    }
    // API 2: Ghi dữ liệu vào Database (POST)
    else if (req.method === 'POST' && parsedUrl.pathname === '/api/them-moi') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            // Thêm dữ liệu mới vào mảng database
            database.push(data);
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: "Da luu vao database thanh cong!" }));
        });
    }
    else {
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server dang chay voi Database...");
});