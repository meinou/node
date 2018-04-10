const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());
promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type',  'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('will send all the promotiones to you');
})
.post((req, res, next) => {
    res.end('will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('delete all the info');
})

promoRouter.route('/:promoId')
.get((req, res, next) => {
    res.end('will send detail of promotion: ' + req.params.promoId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST is not supported on /promotions/' + req.params.promoId);
})
.put((req, res, next) => {
   res.write('Updating the promotion on /promotions/' + req.params.promoId );
    res.end('\nWill update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});

module.exports = promoRouter;
// const express = require('express');
// const bodyParser = require('body-parser');

// const promotionRouter = express.Router();

// promotionRouter.use(bodyParser.json());

// promotionRouter.route('/')
// .all((req,res,next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .get((req,res,next) => {
//     res.end('Will send all the promotiones to you!');
// })
// .post((req, res, next) => {
//     res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
// })
// .put((req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /promotiones');
// })
// .delete((req, res, next) => {
//     res.end('Deleting all promotiones');
// });

// module.exports = promotionRouter;