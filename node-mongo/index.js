const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//const url = 'mongodb://localhost:27017/conFusion';
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, (err, db) => {
    assert.equal(err, null);
    console.log('connected correctly to server');
   // console.log(db.db('dishes').collection('dishes'));
    //const collection = db.collection('dishes');
    // const collection = db.db('dishes');
    const collection = db.db('conFusion').collection('dishes');
   // const collection = db.db('dishes').collection('dishes');
   
    // collection.insertOne({"name": "Uthappizza", "description": "test"},
    // (err, result) => {
    //     console.log('sfehgrdxjhtcf');
    // });

    collection.insertOne(
        {"name": "Uthappizza", "description": "test"},
        {
           writeConcern: {"name": "Uthappizza", "description": "test"}
        }
     )
    collection.insertOne({"name": "Uthappizza", "description": "test"}, 
    (err, result) =>{
        assert.equal(err, null);
        console.log("afret insert\n");
        console.log(result);

        collection.find({}).toArray((err, docs) => {
            console.log(" found: \n");
            console.log(docs);
            db.db('conFusion').dropCollection('dishes', (err, result) => {
                assert.equal(err, null);
                db.close();
            });
        });
    });
});

// MongoClient.connect('mongodb://localhost', function (err, client) {
//   if (err) throw err;

//   var db = client.db('mytestingdb');

//   db.collection('customers').findOne({}, function (findErr, result) {
//     if (findErr) throw findErr;
//     console.log(result.name);
//     client.close();
//   });
// });

// MongoClient.connect('mongodb://localhost:27017', (err, client) => {
//   // Client returned
//   var db = client.db('dishes');
//   console.log(db);
// });

// MongoClient.connect(url, (err, db) => {

//     assert.equal(err,null);

//     console.log('Connected correctly to server');

//     const collection = db.collection("dishes");

    

    // collection.insertOne({"name": "Uthappizza", "description": "test"},
    // (err, result) => {
    //     assert.equal(err,null);

    //     console.log("After Insert:\n");
    //     console.log(result.ops);

    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err,null);
            
    //         console.log("Found:\n");
    //         console.log(docs);

    //         db.dropCollection("dishes", (err, result) => {
    //             assert.equal(err,null);

    //             db.close();
    //         });
    //     });
//     });

// });