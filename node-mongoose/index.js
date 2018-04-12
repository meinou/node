mongoose = require('mongoose');
mongoose.Promise = require ('bluebird');

const Dishes = require('./models/dishes');



const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
  //  useMongoClient: true
});

connect.then((db) => {
    var dbs = mongoose.connection;
  //  dbs.collection('dishes').drop();
    console.log('Connected correctly to server');

    // var newDish = Dishes({
    //     name: 'Uthappfdzsizza',
    //     description: 'tdxgfest'
    // });

  //  newDish.save()
    Dishes.create(
        {
            name: 'appfdzsizza',
            description: 'tdxgfest'
        }
    )
        .then((dish) => {
            console.log(dish);

           // return Dishes.find({}).exec();
           return Dishes.findByIdAndUpdate(dish._id, {
               $set: {description: 'Updated test'}
           },
               { new: true }
           ).exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: 'I\'m getting a sinking feeling!',
                author: 'Leonardo di Carpaccio'
            });
            return dish.save(); 
        })
        .then((dish) => {
            console.log(dish);
            return dbs.collection('dishes').drop();
        })
        .then(() => {
            return dbs.close();
        })
        .catch((err) => {
            console.log(err);
        });

});

// const url =  'mongodb://localhost:27017/conFusion';

// const connect = mongoose.connect(url, {
//   //  useMongoClient:true
// });

// connect.then((db) => {
//     console.log(db);
//     db.collection('dishes').drop();
//     console.log("Connected to server");
// // });

//     var newDish = Dishes({
//         name: 'Pizza',
//         description: 'test'
//     });

//     newDish.save()
//     .then( (dish) => {
//         console.log(dish);

//         return Dishes.find({}).exec()
//         .then((dishes) => {
//             console.log(dishes);
//             return db.collection('dishes').drop();
//         });
//     });

// });


/*
*THIS IS FOR MONGOOSE WITH MONGO LATER THAN # VERSION
connect.then((db) => {
  var db = mongoose.connection;
});
*/


/**
 * AND FOR MONGO CLIENT
 * A snippet explanation from the below link:-

https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0

For people on version 3.0 of the MongoDB native NodeJS driver:

(This is applicable to people with "mongodb": "^3.0.0-rc0", or a later version in package.json, that want to keep using the latest version.)

In version 2.x of the MongoDB native NodeJS driver you would get the database object as an argument to the connect callback:
 * In version 2.x of the MongoDB native NodeJS driver you would get the database object as an argument to the connect callback:
 * MongoClient.connect('mongodb://localhost:27017/mytestingdb', (err, db) => {
  // Database returned
});
According to the changelog for 3.0 you now get a client object containing the database object instead:
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  // Client returned
  var db = client.db('mytestingdb');
});
The close() method has also been moved to the client. The code in the question can therefore be translated to:
MongoClient.connect('mongodb://localhost', function (err, client) {
  if (err) throw err;

  var db = client.db('mytestingdb');

  db.collection('customers').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
    console.log(result.name);
    client.close();
  });
}); 
 */