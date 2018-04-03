const express = require('express');
const http = require('http');
const hostname = 'localhost';
const port = 3000;

const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type',  'text/plain');
    next();
});

app.get('/dishes', (req, res, next) => {
    res.end('will send all the dishes to you');
});

app.post('/dishes', (req, res, next) => {
    res.end('will add the dish' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on /dishes');
});

app.delete('/dishes', (req, res, next) => {
    res.end('delete all the info');
});

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('will send detail of dish: ' + req.params.dishId);
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST is not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
   res.write('Updating the dish on /dishes/' + req.params.dishId)
    res.end('Will update the dish ' + res.body.name + ' with details ' + res.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish ' + req.params.dishId);
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    
    res.statusCode = 200;
    res.setHeader('Content-type',  'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server runs at http://${hostname}:${port}`);
});