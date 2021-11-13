const express = require('express'),
    cors = require('cors'),
    fs = require('fs');

const app = express();

app.use(express.json(), cors(), express.static(__dirname + '/views/'));
app.set('view engine', 'ejs');

const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

app.get('/', (req, res) => res.render('./index.ejs', { data }));

app.get('/data', (req, res) => res.sendFile(`${__dirname}/data.json`));

app.post('/data', (req, res) => {
    fs.writeFile(`${__dirname}/data.json`, JSON.stringify(req.body), (err) => {
        console.log((err) ? err : 'Archivo creado');
        res.statusCode = 403;
    });

    res.statusCode = 201;
    res.end();
});

app.get('/admin', (req, res) => {
    if (!!req.headers.cookie)
        res.sendFile(__dirname + '/views/admin.html');
    else
        res.sendFile(__dirname + '/views/login/index.html');
});

app.post('/admin', (req, res) => {
    const user = 'nicohrz';
    const passwd = 'nicohrzuwu';

    const body = req.body;

    if (user === body.username && passwd === body.password) {
        res.writeHead(200, {
            'Set-Cookie': 'logged=true',
            'Content-Type': 'text/plain'
          });
    } else
        res.sendStatus(401);
    res.end();
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log('Listening in Port ' + PORT));