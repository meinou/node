const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();

const mongoos = require('mongoose');
const Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());
//==========LEADERS====================================
leaderRouter.route('/')
.get((req, res, next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Leader created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on /leaderes');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((resp) => {
        console.log('Leader removed ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


//===========LEADERS ID====================================================
leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        console.log('Leader:  ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST is not supported on /leaders/' + req.params.leaderId);
})
.put((req, res, next) => {
    Leaders.findOneAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findOneAndRemove(req.params.leaderId)
    .then((resp) => {
        console.log('Removed:  ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;
