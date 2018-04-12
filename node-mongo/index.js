const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//const url = 'mongodb://localhost:27017/conFusion';
const url = 'mongodb://localhost:27017';

const dboper = require('./operations');

MongoClient.connect(url).then((db) => {
   
    console.log('connected correctly to server');

    var dbs = db.db('conFusion');
  //  var collection = dbs.collection;
  dbs.dropCollection('dishes');
  //console.log("DROPPEF", dbs);

//   dboper.insertDocument(dbs, { name: "Vadonut", description: "Test"},
//   "dishes")
//   .then((result) => {
//       console.log("Insert Document:\n", result.ops);

//       return dboper.findDocuments(dbs, "dishes");
//   })
//   .then((docs) => {
//       console.log("Found Documents:\n", docs);

//       return dboper.updateDocument(dbs, { name: "Vadonut" },
//               { description: "Updated Test" }, "dishes");

//   })
    dboper.insertDocument(dbs, {name: "ppisegzza", ription: "test"}, 'dishes')
                          .then((result) => {
                                 console.log(" RESULT " + result.ops);

                                 return dboper.findDocuments(dbs, 'dishes');
                          })
                          .then((docs) => {
                                console.log("DOCS: ", docs);

                                return dboper.updateDocument(dbs, { name: 'ppisegzza'}, { ription: 'UPDATED' }, 'dishes');
                          })

                          .then((result) => {
                                console.log("Updated doc :\n", result.result);

                                return dboper.findDocuments(dbs, 'dishes');
                          })
                          .then((docs) => {
                                console.log("FOUND DOCS UPDATED: ", docs);

                                return dbs.dropCollection('dishes');
                          })
                          .then((result) => {
                                console.log("DROPPED: ", result);
                                return db.close();
                          })
                          .catch((err) => console.log(err));
}, (err) => {
    console.log(err);
})
.catch((err) => console.log(err));