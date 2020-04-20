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

db.passengers.find() //# this will return first 20 records and we  need to write it for more, basicall y the result is not t\"he actu book\"al data, instead a pointer.
db.passengers.find() //# this will return first 20 records and we  need to write it for more, basicall y the result is not the actual data, instead a pointer.
db.passengers.find().toArray() //# this will return all the result.

db.passengers.find().forEach((element) => { printjson(element) }); //# we can foreach element and do some functionality to it
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
db.myCollection.find({ field: { $ne: "value" } }) //# not equality operator - $ne.
db.movies.find({ runtime: { $not: { $eq: 60 } } }) //# this is same as db.myCollection.find({ field: { $ne: "value" } }) //# not equality operator - $ne.


//* ELEMENT operators

db.users.find({ age: { $exists: true } })   //# we can search all the document which have a specific field available $exists 
db.users.find({ age: { $exists: true, $gt: 20 } }) //# here we can check if the user have age field and the value is greater than 20
//# by using true we can search for document which doesnt have this field 
db.users.find({ age: { $exists: true, $ne: null } }) //# here we check if the field exists and the value is not null
db.users.find({ age: { $type: "number" } }) //# we can check the type of the field by using $type
db.users.find({ age: { $type: ["number", "string"] } }) //# we can check multiple types
//* $rejex can be used for finding patterns , but is not having a good performance, patterns always write between //

db.movies.find({ summar: { $regex: /musical/ } })  //# we can search for contained search in texts, not an efficiant way
//* $expR can be used for expressions
db.movies.find({ $expr: { $gt: ["$volume", "$target"] } })  //# here we need to mention the fieldname using $, then only it will be considered as a field , or it might consider it as a value.
db.sales.find({ $expr: { $gt: [{ $cond: { if: { $gte: ["Svolume", 190] }, then: { $subtract: ["$volume", 10] }, else: "$volume" } }, "$target"] } }).pretty()  //# comllex function
// if the value is greater than 190 and the diffreence is 10 with the taget. else the voslume is greater than target
//* searching with arrays
//* for arrays we can use $size operator
db.users.find({ hobbies: { $size: 3 } })
db.movies.find({ genre: { $all: ["action", "thriller"] } }) //# in this case, it will not exactly search for action and thriller, it will search for action and thriller, but it douesnt care about other values
//* if we want to match the same  element in the arrayList in the finding operation we need to use $elemMatch
db.users.find({ hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } }).pretty() //db.users.find({$and: [{"hobbies.title": "Sports"}, {"hobbies.frequency": {$gte: 3}}]}).pretty() this will not work properly

const cursorData = db.movies.find();
cursorData.next(); //# will return next documents
cursorData.forEach(document => { printjson(document) }) //# we can print everything
cursorData.hasNext() //# we can find if there is a next record

//* sorting

db.users.find().sort({ "fieldName": 1 })  //# 1 is ascending, -1 is descending
//* we can sort by multiple sort as well
db.users.find().sort({ "fieldName": 1 }, { "anotherfield": -1 })
//* skipping
db.users.find().sort({ "fieldName": 1 }).skip(25) //# we can skin 25 records
db.users.find().sort({ "fieldName": 1 }).skip(25).limit(10) //# we can limit 10 records 
//* we can put aNY ORDER FOR SKIP SORT AND LIMIT QUERY, mongo db will automatically arrange it

//* projection
db.users.find({}, { name: 1, age: 1 }) //# we can specify which fields we need to show, by default it will be 0
db.users.find({}, { name: 1, age: 1, "hobbies.names": 1 }) //# we can select embedded document as well
db.users.find({}, { "genres.$": 1 }) //#  here we can specify that we only need to see the first element the array.
db.movies.find({ genre: "Drama" }, { genres: { $elemMatch: { $eq: "Horror" } } }).pretty() //# here we can display only horror in the array
db.movies.find({ "rating.average": { $gt: 9 } }, { genres: { SelemMatch: { $eq: "Horror" } } }).pretty() //# we only seehorron in the output 

db.movies.find({ rating: 9 }, { genres: { $slice: 2 } }) //# we can display take only first 2 of the array
db.movies.find({ rating: 9 }, { genres: { $slice: [1, 2] } }) //# we can display take only first 2 of the array






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

db.passengers.find() //# this will return first 20 records and we  need to write it for more, basicall y the result is not the actual data, instead a pointer.
db.passengers.find().toArray() //# this will return all the result.

db.passengers.find().forEach((element) => { printjson(element) }); //# we can foreach element and do some functionality to it
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

//! inserting data
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

//! importing the data
mongoimport tvshows.json - d movieData - c movies--jsonArray--drop //# we have to navigate to specific folder which the data exists in the commant prompt, then we can writ this commant.
//# -d (database), -c (collection) --jsonArray (we need to say that it is a array document) --drop (this is to make sure that that if the data exist, it will drop the existing data and it will not append or duplicate data)

//# Ordered Insertes   You can insert documents with insertOne() (one document at a time) or insertMany() (multiple documents) insert() also exists but it’s not recommended to use it anymore - it also doesn’t return the inserted ids
//# WriteConcern    Data should be stored and you can control the “level of guarantee” of that to happen with the writeConcern option
//# Ordered Insertes      By default, when using insertMany(), inserts are ordered — that means, that the inserting process stops if an error occurs You can change this by switching to “unordered inserts” — your inserting process will 
//# then continue, even if errors occurred In both cases, no successful inserts (before the error) will be rolled back


//! Read operation
https://docs.mongodb.com/manual/reference/method/db.collection.find/
db.myCollection.find({ age: 23, salery: { $gt: 20000 } }) //# db is the current db which is connected to, .myCollection is the collection that we need to modify, .find is the method with few input parameters
//#                   ↑ filter            ↑ range operator
//# first argument is a document that we look for, its a filter

//! OPERATORS | Query and projecrtion operators (read related)
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

//! logical conditions
db.movies.find({ $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }] }).pretty() //# logical operators should be first and then followed by conditions in an array
db.movies.find({ $nor: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }] }).pretty()
db.movies.find({ $and: [{ "rating.average": { $gt: 9 } }, { "genres": "drama" }] }) //# this is for and which we can add multiple conditions
db.movies.find({ "rating.average": { $gt: 9 } }, { "genres": "drama" }) //# here we have the same condiotion as AND. becoause by default mongo will consider AND operation
//* and is better to use, if we pass same field 2 times, it will give wrong output
db.myCollection.find({ field: { $ne: "value" } }) //# not equality operator - $ne.
db.movies.find({ runtime: { $not: { $eq: 60 } } }) //# this is same as db.myCollection.find({ field: { $ne: "value" } }) //# not equality operator - $ne.


//! ELEMENT operators

db.users.find({ age: { $exists: true } })   //# we can search all the document which have a specific field available $exists 
db.users.find({ age: { $exists: true, $gt: 20 } }) //# here we can check if the user have age field and the value is greater than 20
//# by using true we can search for document which doesnt have this field 
db.users.find({ age: { $exists: true, $ne: null } }) //# here we check if the field exists and the value is not null
db.users.find({ age: { $type: "number" } }) //# we can check the type of the field by using $type
db.users.find({ age: { $type: ["number", "string"] } }) //# we can check multiple types
//* $rejex can be used for finding patterns , but is not having a good performance, patterns always write between //

db.movies.find({ summar: { $regex: /musical/ } })  //# we can search for contained search in texts, not an efficiant way
//* $expR can be used for expressions
db.movies.find({ $expr: { $gt: ["$volume", "$target"] } })  //# here we need to mention the fieldname using $, then only it will be considered as a field , or it might consider it as a value.
db.sales.find({ $expr: { $gt: [{ $cond: { if: { $gte: ["Svolume", 190] }, then: { $subtract: ["$volume", 10] }, else: "$volume" } }, "$target"] } }).pretty()  //# comllex function
// if the value is greater than 190 and the diffreence is 10 with the taget. else the voslume is greater than target
//! searching with arrays
//* for arrays we can use $size operator
db.users.find({ hobbies: { $size: 3 } })
db.movies.find({ genre: { $all: ["action", "thriller"] } }) //# in this case, it will not exactly search for action and thriller, it will search for action and thriller, but it douesnt care about other values
//* if we want to match the same  element in the arrayList in the finding operation we need to use $elemMatch
db.users.find({ hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } }).pretty() //db.users.find({$and: [{"hobbies.title": "Sports"}, {"hobbies.frequency": {$gte: 3}}]}).pretty() this will not work properly

const cursorData = db.movies.find();
cursorData.next(); //# will return next documents
cursorData.forEach(document => { printjson(document) }) //# we can print everything
cursorData.hasNext() //# we can find if there is a next record
https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/
//! sorting

db.users.find().sort({ "fieldName": 1 })  //# 1 is ascending, -1 is descending
//* we can sort by multiple sort as well
db.users.find().sort({ "fieldName": 1 }, { "anotherfield": -1 })
//! skipping
db.users.find().sort({ "fieldName": 1 }).skip(25) //# we can skin 25 records
db.users.find().sort({ "fieldName": 1 }).skip(25).limit(10) //# we can limit 10 records 
// we can put aNY ORDER FOR SKIP SORT AND LIMIT QUERY, mongo db will automatically arrange it

//! projection
db.users.find({}, { name: 1, age: 1 }) //# we can specify which fields we need to show, by default it will be 0
db.users.find({}, { name: 1, age: 1, "hobbies.names": 1 }) //# we can select embedded document as well
db.users.find({}, { "genres.$": 1 }) //#  here we can specify that we only need to see the first element the array.
db.movies.find({ genre: "Drama" }, { genres: { $elemMatch: { $eq: "Horror" } } }).pretty() //# here we can display only horror in the array
db.movies.find({ "rating.average": { $gt: 9 } }, { genres: { SelemMatch: { $eq: "Horror" } } }).pretty() //# we only seehorron in the output 

db.movies.find({ rating: 9 }, { genres: { $slice: 2 } }) //# we can display take only first 2 of the array
db.movies.find({ rating: 9 }, { genres: { $slice: [1, 2] } }) //# here we can limit the output from array, we skip one and we see next 2 elements
https://docs.mongodb.com/manual/reference/operator/query/

//! Update Operations
https://docs.mongodb.com/manual/tutorial/update-documents/
users.json
db.users.updateOne({ _id: "" }, { $set: { hobbies: [{ name: "", frequency: 1 }, { name: "", frequency: 1 }] } }) //# we can specify the item that we need to update.
db.users.updateMany({ _id: "" }, { $set: { hobbies: [{ name: "", frequency: 1 }, { name: "", frequency: 1 }] } }) //# updateMany works the same
db.users.updateMany({ _id: "" }, { $set: { isSporty: true } }) //# we can pass extra field as well. it will add new field with values
db.users.updateMany({ _id: "" }, { $set: { age: 25, phoneNumber: 89384939 } }) //# we can update multiple fields

db.users.updateOne({ _id: "" }, { $inc: { age: 2 } }) //# This will increment age by 2
db.users.updateOne({ _id: "" }, { $inc: { age: -1 } }) //# This will decrement age by 1
db.users.updateOne({ _id: "" }, { $inc: { age: -1 }, $set: { isSporty: true } }) //# we can use both onc and set operTOR
db.users.updateOne({ _id: "" }, { $inc: { age: 2 }, $set: { age: 30 } }) //! this will throws error, we cannot pass two same field in $inc and $set
db.users.updateOne({ _id: "" }, { $min: { age: 35 } }) //# if the input value is in $min operator is less than the existing value, then only it will update
db.users.updateOne({ _id: "" }, { $max: { age: 35 } }) //# if the input value is in $max operator is greater than the existing value, then only it will update
db.users.updateOne({ _id: "" }, { mul: { age: 1.1 } }) //# this multiply age with 1.1. $mul is a multiply operator
db.users.updateOne({ _id: "" }, { unset: { phone: "" } }) //# if qwe pass $unset operator with a field name, it will remove or drop that specific field, it doesnt matyter what value we pass as the input, we can pass empty string
db.users.updateOne({ _id: "" }, { rename: { age: "totalAge" } }) //# we can rename an existing field by using $rename operator, we can pass the field name and the value as the new name
db.users.updateOne({ name: "Maria" }, { $set: { age: 29, hobbies: [{ title: "Good food", frequency: 3 }], isSporty: true } }) //! this will not do anything, becouse it could not find any item
db.users.updateOne({ name: "Maria" }, { $set: { age: 29, hobbies: [{ title: "Good food", frequency: 3 }], isSporty: true } }, { $upsert: true }) //# here we can insert new value if we cant find that item, even it will insert the filter value as well. in this case, it is maria

db.users.updateMany({ hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } }, { $set: { "hobbies.$.highFrequency": 4 } })  //# here we find only one item using the filter in the array, then we update only to that specific element in the array // hobbies.$ will select the specific array element
db.users.updateMany({ hobbies: { $elemMatch: { "hobbies.frequency": { $gte: 3 } } } }, { $set: { "hobbies.$.goodFrequency": true } })  //# hbut here it will only update one document in the array and it is not enough
db.users.updateMany({ hobbies: { $elemMatch: { "hobbies.frequency": { $gte: 3 } } } }, { $set: { "hobbies.$[].goodFrequency": true } })  //# here we can update for every element in the array document using $[]
db.users.updateMany({ hobbies: { $elemMatch: { "hobbies.frequency": { $gte: 3 } } } }, { $set: { "hobbies.$[el].goodFrequency": true } }, { arrayFilters: [{ "el.frequency": { gt: 2 } }] })  //# if we want to update items in array which have specific filter cryteria. we need initialise a variable inside the array and we need to check the condition again in a new document as a argument with operator $arrayFilter
db.users.updateMany({ name: "maria" }, { $push: { hobbies: { name: "", frequency: 1 } } })  //# we can insert new records to an existing array using $push
db.users.updateMany({ name: "maria" }, { $push: { hobbies: { $each: [{ name: "", frequency: 1 }, { name: "", frequency: 2 }] } } })  //# for inserting multiple documents, we need to add $each operator.
db.users.updateMany({ name: "maria" }, { $push: { hobbies: { $each: [{ name: "", frequency: 1 }, { name: "", frequency: 2 }], $sort: { frequency: 1 } } } })  //# we can even sort the everything including the existing record(existing record will also be modified)
db.users.updateMany({ name: "maria" }, { $pull: { hobbies: { name: "", frequency: 1 } } }) //# this will remove one item from the array which match the condition
db.users.updateMany({ name: "maria" }, { $pop: { hobbies: 1 } }) //# we can remove the last or first element from the list. 1 is for last element and -1 for first element

db.users.updateMany({ name: "maria" }, { $addToSet: { hobbies: { name: "", frequency: 1 } } }) //# we can add value to the array, but if the value already exists, it will not add. repeatation will not happen in this case

//! Delete Operation
https://docs.mongodb.com/manual/tutorial/remove-documents/
//* All filteration that learned in filter can  be used in delete as well

db.users.updateMany({ name: "maria" }) //# this will delete the specific items that we found we filetered
db.users.updateMany({ name: "maria", age: { $gt: 30 } }) //# this will delete the specific items that we found we filetered, we can use 
db.users.updateMany({}) //# everything is deleted in the collection
db.users.drop()
db.dropDatabase()

//! Indexers
//* So it's not an ordered list of the documents, just of the values for the field for which you created that index
//* So it can very efficiently go through that index and then find the matching products because of that ordering
//* and because of that pointer, every element in this index has, so mongodb finds the value for this query
//* and then finds the related documents it can return this,
//* so it's this direct access that mongodb can use here and that speeds up your queries.

db.contacts.explain("exexutionStatus").find({ age: { $gt: 30 } })   //# by using explain we can know how the execution went

db.contacts.createIndex({ "dob.age": 1 }) //# we can add indexes using this format. 1 for ascending and -1 for descending
db.contacts.dropIndex({ "dob.age": 1 }) //# we can drop indexes using this format. 1 for ascending and -1 for descending
//* If you have a dataset where your queries typically only return fractions, like 10 or 20 percent or lower than that of the documents, then indexes will almost certainly always speed it up. 
//* If you've got a lot of queries that give you back all the documents or close to all the documents, indexes can't do that much work for you
db.contacts.createIndex({ "dob.age": 1, gender: 1 }) //# we can add compound indexes using this format. 1 for ascending and -1 for descending
//* if we create compound index, indexer will work when we search with both items and first item
db.contacts.explain().find({ age: { $gt: 30 }, gender: "male" })   //# here index will use for searching, here order matters
db.contacts.explain().find({ age: { $gt: 30 } })   //# here as well
db.contacts.explain().find({ gender: "male" })   //# here index will not use for searching
//* indexers can be used to sort the dataas well

db.contacts.getIndexes() //# this will give information about the indexes
//# _id is a auto created index by mongo

//* we can create a unique value index as well (like _id)
db.contacts.explain().find({ email: 1 }, { unique: true })   //#  here we make the field unique, so that the value cannot repeat
db.contacts.createIndex({ "dob.age": 1 }, { partialFilterExpression: { "dob.age": { $gt: 60 } } }) //# we can again narrow down the index by some values, but to use this index while finding, we still need to mention the search criteria.

//* if we want to add unique index to non nullable values, we can do it
db.contacts.createIndex({ email: 1 }, { unique: true, partialFilterExpression: { email: { $exists: true } } }) //# now we can add value with null

//* time to live index | we can mention when the record should auto delete, but this functionality only available for date field
db.contacts.createIndex({ craetedAt: 1 }, { expireAfterSeconds: 10 }) //# new document will auto delete after 10 seconds, it doeesnt work in compound indexes

//* Quary diagnose
explain("executionStats")
explain("allPlansExecution")
//* things to examine
millisecondProcessTime
IXSCAN, COLLSCAN
// #No of key in index examined
// #No of documents examined
// #No of documents returned
//* covered query | if we only return the indexed field only, then the execution is very fast, that it doesnt need to examine the documents
//* mongodb will try to find the best plan to fetch the data and make it as the winning plan. and this plan will be cached, so next time it will use it next time
//* if we insert 1000 records, then the cache will be cleared, or if we recreated the index,  if we add other indexes, or restart the mongo db server

//* text indexes are a special indexes for texts, using $rejex will slow down the fetching
//* text indexers will take all the words and put inside a array of strings and remove words like "is, or as", only stores key values
db.products.createIndex({ description: "text" }) //# we need to add a special keywork "text" for text index
db.products.find({ $text: { $search: "awesome" } }).pretty()  //# weneed to search text index like this
db.products.find({ $text: { $search: "\"awesome book\"" } }).pretty()  //# if we need to find an exact phrace, we need to put the sentance in double qoutes

db.products.find({ $text: { $search: "awesome t-shirt" } }, { score: { $meta: "textScore" } }).pretty()  //# $meta:"textScore" is a special operator, we can get the score of relation , if we can sort it , we will get most related output first
db.products.find({ $text: { $search: "awesome t-shirt" } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).pretty()  //# $meta:"textScore" is a special operator, we can get the score of relation , if we can sort it , we will get most related output first

//* we can have only one textIndex and we can merge two colums
db.products.createIndex({ title: "text", description: "text" }) //# we can merge 2 text indexes

db.products.find({ $text: { $search: "awesome - t-shirts" } }).pretty() //# now we can exclude t-shirts , but we can search foe awesome
db.products.createIndex({ title: "text", description: "text" }, { default_language: "english" }) //# we can set language
db.products.createIndex({ title: "text", description: "text" }, { weights: { title: 1, description: 10 } }) //# description is 10 times weighter than title, this will change the score

db.products.find({ $text: { $search: "awesome", $caseSensitive: true } }).pretty()  //# we can set the case sensitive as well

//* building indexes - Foreground | Background
//* while creating an index, it will lock the collection and take time.
db.products.createIndex({ description: "text" }, { background: true }) //# we can make the index creation in the background












