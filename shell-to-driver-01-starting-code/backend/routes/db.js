const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongoDBUrl =
  "mongodb+srv://dbLearningUser:uE4cm2pjg8rxb6Ov@artfox-dev-ivrcp.mongodb.net/Shop?retryWrites=true&w=majority";

let _db;
const initdb = (callback) => {
  if (_db) {
    console.log("Database already initiaklized");
    return callback(null, _db);
  }
  MongoClient.connect(mongoDBUrl)
    .then((client) => {
      _db = client.db();
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (_db) {
    console.log("Database already initiaklized");
  }
  return _db;
};

module.exports = {
  initdb,
  getDb,
};
