const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type',  'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('will send all the dishes to you');
})
.post((req, res, next) => {
    res.end('will add the dish' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('delete all the info');
})

// // app.get('/dishes/:dishId', (req, res, next) => {
// //     res.end('will send detail of dish: ' + req.params.dishId);
// // })
// // .post('/dishes/:dishId', (req, res, next) => {
// //     res.statusCode = 403;
// //     res.end('POST is not supported on /dishes/' + req.params.dishId);
// // })
// // .put('/dishes/:dishId', (req, res, next) => {
// //    res.write('Updating the dish on /dishes/' + req.params.dishId)
// //     res.end('Will update the dish ' + res.body.name + ' with details ' + res.body.description);
// // })
// // .delete('/dishes/:dishId', (req, res, next) => {
// //     res.end('Deleting dish ' + req.params.dishId);
// // });

module.exports = dishRouter;
// const express = require('express');
// const bodyParser = require('body-parser');

// const dishRouter = express.Router();

// dishRouter.use(bodyParser.json());

// dishRouter.route('/')
// .all((req,res,next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .get((req,res,next) => {
//     res.end('Will send all the dishes to you!');
// })
// .post((req, res, next) => {
//     res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
// })
// .put((req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /dishes');
// })
// .delete((req, res, next) => {
//     res.end('Deleting all dishes');
// });

// module.exports = dishRouter;