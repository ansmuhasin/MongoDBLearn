show dbs
var db = use flights //* just for better intellisence 
db.flightData.insertOne({
  "departureAirport": "MUC",
  "arrivalAirport": "SFO",
  "aircraft": "Airbus A380",
  "distance": 12000,
  "intercontinental": true
})
db.flightData.InsertMany()
db.flightData.find().pretty()
db.flightData.deleteOne({ "arrivalAirport": "TXL" })
db.flightData.updateOne({ distance: 120000 }, { marker: "Delete" })   //! Throws error!!!! 
db.flightData.updateOne({ distance: 120000 }, { $set: { marker: "Delete" } })   //# should assign a set for updating
db.flightData.updateMany({}, { $set: { marker: "toDelete" } })   //# Can pass {} for selecting everything.
db.flightData.deleteMany({}, { marker: "toDelete" })   //# Can pass {} for selecting everything.
db.flightData.insertMany([
  {
    "departureAirport": "MUC",
    "arrivalAirport": "SFO",
    "aircraft": "Airbus A380",
    "distance": 12000,
    "intercontinental": true
  },
  {
    "departureAirport": "LHR",
    "arrivalAirport": "TXL",
    "aircraft": "Airbus A320",
    "distance": 950,
    "intercontinental": false
  }
])

db.flightData.find({ intercontinental: true })
db.flightData.find({ distance: { $gt: 10000 } }) //# need to pass $gt for greater than
db.flightData.findOne({ distance: { $gt: 900 } }) //# Only find the first one in the list.
db.flightData.update({ distance: 120000 }, { marker: "Delete" })   //# update is almost same as updateMany but we don't need to  pass $set parameter.
//! But it will replace the entire document
db.flightData.replaceOne({ _id: 12345 }, {
  "departureAirport": "LHR",
  "arrivalAirport": "TXL",
  "aircraft": "Airbus A320",
  "distance": 950,
  "intercontinental": false
})

db.passengers.insertMany([
  {
    "name": "Max Schwarzmueller",
    "age": 29
  },
  {
    "name": "Manu Lorenz",
    "age": 30
  },
  {
    "name": "Chris Hayton",
    "age": 35
  },
  {
    "name": "Sandeep Kumar",
    "age": 28
  },
  {
    "name": "Maria Jones",
    "age": 30
  },
  {
    "name": "Alexandra Maier",
    "age": 27
  },
  {
    "name": "Dr. Phil Evans",
    "age": 47
  },
  {
    "name": "Sandra Brugge",
    "age": 33
  },
  {
    "name": "Elisabeth Mayr",
    "age": 29
  },
  {
    "name": "Frank Cube",
    "age": 41
  },
  {
    "name": "Karandeep Alun",
    "age": 48
  },
  {
    "name": "Michaela Drayer",
    "age": 39
  },
  {
    "name": "Bernd Hoftstadt",
    "age": 22
  },
  {
    "name": "Scott Tolib",
    "age": 44
  },
  {
    "name": "Freddy Melver",
    "age": 41
  },
  {
    "name": "Alexis Bohed",
    "age": 35
  },
  {
    "name": "Melanie Palace",
    "age": 27
  },
  {
    "name": "Armin Glutch",
    "age": 35
  },
  {
    "name": "Klaus Arber",
    "age": 53
  },
  {
    "name": "Albert Twostone",
    "age": 68
  },
  {
    "name": "Gordon Black",
    "age": 38
  }
])  //# it can be used to see more

db.passengers.find() //# this will return first 20 records and we  eed to write it for more, basicall y the result is not the actual data, instead a pointer.
db.passengers.find().toArray() //# this will return all the result.

db.passengers.find().array.forEach((element) => { printjson(element) }); //# we can foreach element and do some functionality to it
//# this is called projection
db.passengers.find({}, { name: 1 })  //# we need to pass an empty filter and then we need to say that name to include. but _id will be returnred by default. for that we need to explicitly tell to not include
db.passengers.find({}, { name: 1, _id: 0 })
//# embedded document - It is nesting of data inside document.
//# we can have upto 100 nestings inside the document
//# maximum data size for a document is 16 MB's
db.flightData.updateMany({}, { set: { status: { descriptoin: "on-time", lastUpdated: "1hour ago" } } })
//# arrays are another document type
db.passengers.updateMany({ name: "albert" }, { set: { status: { hobbies: ["music", "cooking"] } } })  //# we can pass multiple values using array.
db.passengers.findOne({ name: "albert" }).hobbies  //# this will only return hobbies
db.passengers.find({ hobbies: "cooking" })  //# this will return hobbies which have dancing..

//# for finding data inside nested document
db.flightData.find({ "status.description": "on-time" }) //# in this case, we need to pass the key inside a string.
db.flightData.updateMany({}, { $set: { status: { descriptoin: "on-time", lastUpdated: "1hour ago", details: { responsible: "ans" } } } })
db.flightData.find({ "status.details.responsible": "someNmae" }) //# in this case, we need to pass the key inside a string.


//# schema validation.

validator.js //*check this file
db.createCollection() // used to create schhema validation
bsonType //# type of that specific value
vequired //# must have items
properties //# we can add a properties key which is another nested document where we can define for every property of every document that gets added to the  collection, how it should look like
description
items //# items key here which describes how the items should look like in that array.
db.runCommand({ collMod: "targetting collection", }) //* for updating the validator
validationAction: 'warn' //# we can set a validation action.
ValidatorUpdate.js // example

mongod--help //* for getting help related to mongo db server configuration.
https://docs.mongodb.com/manual/reference/program/mongod/
mongod--path somepath //# this will create the db in the given location.
mongod--path somepathforlog\log.log //# will create a log file

//* you quit all existing processes in all your command prompts.
//* You can start it by right clicking on the command prompt and running it as administrator
//* and then you can type net start mongodb and this will start up the mongodb server as a background
//* service.
//* On Windows you can also easily stop it by again opening a command prompt as administrator and running
//* net stop mongodb in there, written like this

//* mongdb configuraring Data
mongod.cfg
https://docs.mongodb.com/manual/reference/configuration-options/
mongod - f //* or mongod --config ////takes the config settings

mongo--help //* for help with shell 
https://docs.mongodb.com/manual/reference/program/mongo/
//* typing just help might work when connected after shell will give all output

//* Mongodb compass - A visual interface
https://docs.mongodb.com/compass/master/install/

//* inserting data
insertOne(), db.collectionName.insertOne({ field: "value" })
insertMany(), db.collectionName.insertMany([
  { field: "value" },
  { field: "value" }])
insert(), db.collectionName.insert() //* this will lead to confusion
mongoimport //* for importing from other environment

insertMany([{}], { ordered: false }) //# if we pass ordered as false, insert will contineu for othr values even if the insert faileb before, by defauld this value is true


insertOne({}, { writeConcern: { w: 0 } })  //# w:0 this may or may not save in the db. so that it will not return any objectId, 1 is the default.
insertOne({}, { writeConcern: { w: 1, j: true } }) //# j: true is slow becouse it will insert for sure
insertOne({}, { writeConcern: { w: 1, j: true, wtimout: 200 } }) //# 
//? write concerns are applicable to both update as well as delete?

//*atomicity for insertOne operations, if the insert fails for some documents inside a inner documnt, then it will be rolled back, if it is saving it will save as a whole

//* importing the data
mongoimport tvshows.json - d movieData - c movies--jsonArray--drop //# we have to navigate to specific folder which the data exists in the commant prompt, then we can writ this commant.
//# -d (database), -c (collection) --jsonArray (we need to say that it is a array document) --drop (this is to make sure that that if the data exist, it will drop the existing data and it will not append or duplicate data)

//# Ordered Insertes   You can insert documents with insertOne() (one document at a time) or insertMany() (multiple documents) insert() also exists but it’s not recommended to use it anymore - it also doesn’t return the inserted ids
//# WriteConcern    Data should be stored and you can control the “level of guarantee” of that to happen with the writeConcern option
//# Ordered Insertes      By default, when using insertMany(), inserts are ordered — that means, that the inserting process stops if an error occurs You can change this by switching to “unordered inserts” — your inserting process will 
//# then continue, even if errors occurred In both cases, no successful inserts (before the error) will be rolled back


//* Read operation

db.myCollection.find({ age: 23, salery: { $gt: 20000 } }) //# db is the current db which is connected to, .myCollection is the collection that we need to modify, .find is the method with few input parameters
//#                   ↑ filter            ↑ range operator
//# first argument is a document that we look for, its a filter

//* OPERATORS | Query and projecrtion operators (read related)
//# query operator - for locsting the data | ex- $gt 
//# Projection operator - Modifying data presentation | 

db.myCollection.find({ field: { $eq: "value" } }) //# equality operator - $eq, same as normal find.
db.myCollection.find({ field: { $ne: "value" } }) //# not equality operator - $ne.
db.myCollection.find({ field: { $lt: "value" } }) //# lowe than operator - $lt.
db.myCollection.find({ field: { $lte: "value" } }) //# lower  than equal operator - $lte.
db.myCollection.find({ field: { $gte: "value" } }) //# greater  than equal operator - $gte.
//* for finding inner document , we can type "parentFieldName.childFieldName"

db.myCollection.find({ arrayfield: "drama" }) //# for finding arrays, we can search with the field name and any of the value in the array, in this case it will return everything which have that value 
db.myCollection.find({ arrayfield: ["drama"] }) //# if we put [], it will exactly search for that specific values in the array
db.myCollection.find({ field: { $in: ["value", "value2"] } }) //# $in here we can search for multiple values
db.myCollection.find({ field: { $nin: ["value", "value2"] } }) //# $nin here we can not include multiple values

//* logical conditions
db.movies.find({ $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }] }).pretty() //# logical operators should be first and then followed by conditions in an array
db.movies.find({ $nor: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }] }).pretty()
db.movies.find({ $and: [{ "rating.average": { $gt: 9 } }, { "genres": "drama" }] }) //# this is for and which we can add multiple conditions
db.movies.find({ "rating.average": { $gt: 9 } }, { "genres": "drama" }) //# here we have the same condiotion as AND. becoause by default mongo will consider AND operation
//* and is better to use, if we pass same field 2 times, it will give wrong output








