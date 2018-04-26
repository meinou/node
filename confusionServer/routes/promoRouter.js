const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

const authenticate = require('../authenticate');

promoRouter.use(bodyParser.json());
//=============================Promo /======================
promoRouter.route('/')
.get((req, res, next) => {
    Promotions.find({})
    .then( (promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Promotions.create(req.body)
    .then( (promotion) => {  
        console.log('Promotion created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on /promotions');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

//==================================PROMOTIONS ID=========================================================================

promoRouter.route('/:promoId')
.get((req, res, next) => {
    Promotions.findById(req.params.promoId)
    .then( (promotion) => {  
        console.log('This is your promotion: ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST is not supported on /Promotions/' + req.params.promoId);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Promotions.findOneAndUpdate(req.params.promoId, {
        $set: req.body
    }, {new: true})
    .then( (promotion) => {  
        //console.log('This is your promotion: ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.findOneAndRemove(req.params.promoId)
    .then( (resp) => {
        console.log('REMOVED');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports = promoRouter;