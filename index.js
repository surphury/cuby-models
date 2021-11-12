const express = require('express'),
    cors = require('cors'),
    fs = require('fs');

const app = express();

app.use(express.json(), cors(), express.static(__dirname + '/views/'));

let ips = JSON.parse(fs.readFileSync(`${__dirname}/ips.json`));

app.get('/data', (req, res) => {
    res.sendFile(`${__dirname}/data.json`);
});

app.post('/data', (req, res) => {
    fs.writeFile(`${__dirname}/data.json`, JSON.stringify(req.body), (err) => {
        console.log((err) ? err : 'Archivo creado');
        res.statusCode = 403;
    });

    res.statusCode = 201;
    res.end();
});


app.get('/admin', (req, res) => {
    if (ips.includes(req.socket.remoteAddress)) {
        res.sendFile(__dirname + '/views/admin.html');
    } else {
        res.sendFile(__dirname + '/views/login/index.html');
    }
});

app.post('/admin', (req, res) => {
    const user = 'nicohrz';
    const passwd = 'nicohrzuwu';

    const body = req.body;

    if (user === body.username && passwd === body.password) {
        ips.push(req.socket.remoteAddress);
        fs.writeFile(`${__dirname}/ips.json`, JSON.stringify(ips), (err) => console.log(err));
    } else
        res.sendStatus(401);
    res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Listening in Port ' + PORT));