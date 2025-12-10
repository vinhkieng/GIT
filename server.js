const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Neu khach vao trang chu, gui file html cho ho
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (req.url === '/api/time') {
        // Neu khach hoi gio (Backend xu ly logic o day)
        const time = new Date().toLocaleTimeString();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ gioHienTai: time }));
    }
});

server.listen(3000, () => {
    console.log("Server dang chay...");
});