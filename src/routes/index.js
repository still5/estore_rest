const fs = require('fs');
//const { timeStamp } = require('console');

const routesHandler = (req,res ) => {
    const url = req.url;
    const method = req.method;

    //var today = new Date();
    //var time = today.getHours() + ':' + today.getMinutes();
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><input type="submit" name="Submit"></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    //console.log(req.url, req.method, req.headers);
    //process.exit();
    //console.log('request ',time);
}

module.exports.handler = routesHandler;