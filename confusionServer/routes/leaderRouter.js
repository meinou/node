const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type',  'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('will send all the leaderes to you');
})
.post((req, res, next) => {
    res.end('will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on /leaderes');
})
.delete((req, res, next) => {
    res.end('delete all the info');
});

leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    res.end('will send detail of leader: ' + req.params.leaderId);
})
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST is not supported on /leaders/' + req.params.leaderId);
})
.put((req, res, next) => {
   res.write('Updating the leader on /leaders/' + req.params.leaderId);
    res.end('\nWill update the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;
// const express = require('express');
// const bodyParser = require('body-parser');

// const leaderRouter = express.Router();

// leaderRouter.use(bodyParser.json());

// leaderRouter.route('/')
// .all((req,res,next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .get((req,res,next) => {
//     res.end('Will send all the leaderes to you!');
// })
// .post((req, res, next) => {
//     res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
// })
// .put((req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /leaderes');
// })
// .delete((req, res, next) => {
//     res.end('Deleting all leaderes');
// });

// module.exports = leaderRouter;