
const http = require('http');
const fs = require("fs");
const path = require("path");


const server = http.createServer((req, res) => {
    let filePath = "";
    let contentType = 'text/html';


    if (req.url.endsWith(".css")) {
        const cssPath = path.join(__dirname, req.url);
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end("CSS File Not Found");
            }
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
        });
        return; 
    }


    if (req.url.toLocaleLowerCase() === '/' || req.url.toLocaleLowerCase() === '/home' ) {
        filePath = path.join(__dirname, 'Home.html');


    }else if(req.url.toLocaleLowerCase() === '/services'){

 filePath = path.join(__dirname, 'services.html');

    }else if(req.url.toLocaleLowerCase() === '/about'){

filePath = path.join(__dirname, 'about.html');

    }else if (req.url.toLocaleLowerCase() === '/contact'){

         filePath = path.join(__dirname, 'contact.html');



    }
    else{
 filePath = path.join(__dirname, '404.html');
 res.statusCode = 404;
    }


    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Server Error");
        } else {
            res.writeHead(res.statusCode === 404 ? 404 : 200, {
                "Content-Type": contentType
            });
            res.end(data);
        }
    });

})

const PORT = 2000;
server.listen(PORT, () => {

    console.log(`http://localhost:${PORT}`);

})