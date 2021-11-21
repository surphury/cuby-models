const express = require('express'),
    app = express(),
    cors = require('cors'),
    axios = require('axios'),
    fs = require('fs');

require('dotenv').config();

/* Enviroment varibles */
const APIKey = process.env['APIKey'];
const user = process.env['user'];
const passwd = process.env['passwd'];
/* Enviroment varibles */

let data;
const getData = () => data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
getData();

app.use(express.json(), cors(), express.static(__dirname + '/views/'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('./index.ejs', { data }));

app.get('/data', (req, res) => res.sendFile(`${__dirname}/data.json`));

const processYTLinks = async (videoLink) => {
    const APIURL = `https://iframe.ly/api/oembed?url=${videoLink}&api_key=${APIKey}`;
    const video = await axios.get(APIURL);

    return video.data.url;
}

app.post('/data', async (req, res) => {
    let data = req.body;
    const { YTlinks } = data;

    for (let i = 0; i < YTlinks.length; i++) {
        data.YTlinks[i] = await processYTLinks(YTlinks[i]);
    }

    fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(data));
    getData();
    res.statusCode = 201;
    res.end();
});

app.get('/admin', (req, res) => {
    if (req.headers.cookie === 'logged=true')
        res.sendFile(__dirname + '/views/admin.html');
    else
        res.sendFile(__dirname + '/views/login/index.html');
});

app.post('/admin', (req, res) => {

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