const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();

const mongoose = require('mongoose');
const Dishes = require('../models/dishes');

dishRouter.use(bodyParser.json());
dishRouter.route('/')
.get((req, res, next) => {
    Dishes.find({})
    .then( (dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Dishes.create(req.body)
    .then( (dish) => {  
        console.log('Dish created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on /dishes');
})
.delete((req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

//===================================DISH ID=========================================================

dishRouter.route('/:dishId')
.get( (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then( (dish) => {  
        console.log('This is your dish: ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST is not supported on /dishes/' + req.params.dishId);
})
.put((req, res, next) => {
    Dishes.findOneAndUpdate(req.params.dishId, {
        $set: req.body
    }, {new: true})
    .then( (dish) => {  
        //console.log('This is your dish: ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findOneAndRemove(req.params.dishId)
    .then( (resp) => {
        console.log('REMOVED');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//================================COMMENTS===========================================

dishRouter.route('/:dishId/comments')
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if (dish != null) {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        } else {
            err = new Error('Dish with ID ' + req.params.dishId + ' does not exist');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if (dish != null) {
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        } else {
            err = new Error('Dish with ID ' + req.params.dishId + ' does not exist');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on /dishes/' + req.params.dishId + '/comments');
})
.delete((req, res, next) => {
  //  Dishes.remove({})
    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if (dish != null) {
            for ( var i = dish.comments.length - 1; i >= 0; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
           // dish.comments.remove({});
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        } else {
            err = new Error('Dish with ID ' + req.params.dishId + ' does not exist');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

//===================================COMMENT = ID=========================================================

dishRouter.route('/:dishId/comments/:commentId')
.get( (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then( (dish) => {  
        if (dish != null && 
            dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        } else if (dish == null) {
            err = new Error('Dish with ID ' + req.params.dishId + ' does not exist');
            err.status = 404;
            return next(err);
        } else {
            err = new Error('Dish comment with ID ' + req.params.commentId + ' does not exist');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST is not supported on /dishes/' + req.params.dishId + '/comments/' + req.params.commentId);
})
.put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then( (dish) => {  
        if (dish != null && 
            dish.comments.id(req.params.commentId) != null) {
                // dish.comments.findOneAndUpdate(req.params.commentId, {
                //     $set: req.body
                // }, { new: true })
                // .then( (comment) => {

                // res.statusCode = 200;
                // res.setHeader('Content-Type', 'application/json');
                // res.json(dish);
                // });
                if (req.body.comment) {
                    dish.comments.id(req.params.commentId).comment = req.body.comment;
                }
                if (req.body.rating) {
                    dish.comments.id(req.params.commentId).rating = req.body.rating;
                }
                dish.save()
                .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                }, (err) => next(err));

        } else if (dish == null) {
            err = new Error('Dish with ID ' + req.params.dishId + ' does not exist');
            err.status = 404;
            return next(err);
        } else {
            err = new Error('Dish comment with ID ' + req.params.commentId + ' does not exist');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if (dish != null &&  dish.comments.id(req.params.commentId) != null) {
            
            dish.comments.id(req.params.commentId).remove();
                      
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        } else if (dish == null) {
            err = new Error('Dish with ID ' + req.params.dishId + ' does not exist');
            err.status = 404;
            return next(err);
        } else {
            err = new Error('Dish comment with ID ' + req.params.commentId + ' does not exist');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = dishRouter;