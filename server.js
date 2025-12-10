const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Cho phép Frontend gọi lên
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("Loi file!");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        });
    } else if (req.url === '/api/time') {
        // --- SỬA CHỖ NÀY: Ép múi giờ về Việt Nam ---
        const time = new Date().toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ gioHienTai: time }));
    } else {
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server dang chay...");
});