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
db.passengers.find({}, { name: 1 })  //# we need to pass an empty filter and then we need to say that name to include. but _id will be returnred by default. for that we need to explicitly tell to not include
db.passengers.find({}, { name: 1, _id: 0 })
//# this is called projection
//# embedded document - It is nesting of data inside document.
//# we can have upto 100 nestings inside the document
//# maximum data size for a document is 16 MB's
db.flightData.updateMany({}, { set: { status: { descriptoin: "on-time", lastUpdated: "1hour ago" } } })
//# arrays are another document type
db.passengers.updateMany({ name: "albert" }, { set: { hobbies: ["music", "cooking"] } })  //# we can pass multiple values using array.
db.passengers.findOne({ name: "albert" }).hobbies  //# this will only return hobbies
db.passengers.find({ hobbies: "cooking" })  //# this will return hobbies which have cooking..

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
db.users.updateOne({ _id: "" }, { $inc: { age: -1 }, $set: { isSporty: true } }) //# we can use both inc and set operTOR
db.users.updateOne({ _id: "" }, { $inc: { age: 2 }, $set: { age: 30 } }) //! this will throws error, we cannot pass two same field in $inc and $set
db.users.updateOne({ _id: "" }, { $min: { age: 35 } }) //# if the input value is in $min operator is less than the existing value, then only it will update
db.users.updateOne({ _id: "" }, { $max: { age: 35 } }) //# if the input value is in $max operator is greater than the existing value, then only it will update
db.users.updateOne({ _id: "" }, { mul: { age: 1.1 } }) //# this multiply age with 1.1. $mul is a multiply operator
db.users.updateOne({ _id: "" }, { $unset: { phone: "" } }) //# if qwe pass $unset operator with a field name, it will remove or drop that specific field, it doesnt matyter what value we pass as the input, we can pass empty string
db.users.updateOne({ _id: "" }, { $rename: { age: "totalAge" } }) //# we can rename an existing field by using $rename operator, we can pass the field name and the value as the new name
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
https://docs.mongodb.com/manual/core/index-partial/
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
https://docs.mongodb.com/manual/reference/text-search-languages/#text-search-languages
db.products.find({ $text: { $search: "awesome", $caseSensitive: true } }).pretty()  //# we can set the case sensitive as well

//* building indexes - Foreground | Background
//* while creating an index, it will lock the collection and take time.
db.products.createIndex({ description: "text" }, { background: true }) //# we can make the index creation in the background

//! Geospatial Data
https://docs.mongodb.com/manual/geospatial-queries/
https://docs.mongodb.com/manual/reference/operator/query-geospatial/
//* geoJason Format, longitude and  lattittude in an array
db.places.insertOne({ name: california, location: { "type": "Point", coordinates: [-122.32, 37.898] } }) //# we can insert geo location like this. 
//#         we can give any name till here ↑   ↑this should right format↑  ↑longit  ↑lattittude

//* we need to create a geospatial index to find the search results
db.places.createIndex({ location: "2dsphere" }) //# this will create a geospatial index

db.places.find({ location: { $near: { $geometry: { type: "Point", coordinates: [-122.476, 37.771] } } } }) //# query to find if it is a nearest point
db.places.find({ location: { $near: { $geometry: { type: "Point", coordinates: [-122.476, 37.771] }, $maxDistance: 30, $minDistance: 10 } } }) //# we can mention maximum distance and minimum distance as filters (in meters)

//# we can find the points inside an area (for that we need multiple points as apoligon)

const pl = [-122.494, 3.56483]
const p2 = [-122.45303, 37.76641]
const p3 = [-122.51026, 37.76411]
const p4 = [-122.51088, 37.77131]

db.places.find({ location: { $geoWithin: { $geometry: { type: "poligon", coordinates: [[p1, p2, p3, p4, p1]] } } } }) //# here we can pass a poligon input that is p1, p2, p3, p4. and polygon type. this will show the points inside the location

//* we can search if the point is inside the area or not
//* for that we need to save a poligon  inside the DB
db.areas.insertOne({ name: "goldan Gate", area: { type: "polygon", coordinates: [[p1, p2, p3, p4, p1]] } })  // we can save poligon inside the DB

db.areas.find({ area: { $geoIntersects: { $geometry: { type: "Point", coordinates: [-122.324, 37.97877] } } } }) //# we can find the input point is inside the area or Notification
//* finding all points around a circle around the point.
db.places.find({ location: { $geoWithin: { $centerSphere: [[-122.476, 37.771], 1 / 6378.1] } } }) //# now we can find the location in a certain radius, but it gives an unsorted list. but $near operator gives a sorted list. and we need to convert the KM or miles to radians as a second parameter

//! Aggregation Framework
https://docs.mongodb.com/manual/core/aggregation-pipeline/
//* Retrieving the data in a structured and efficient way
//* aggregate function takes an array becoause we take a series of steps

db.persons.aggregate([{ $match: { gender: "female" } }]).pretty()  //works same as find method
//* $group can help to group the data in certain fields
db.persons.aggregate([
  { $match: { gender: "female" } },
  { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } }  //# 1 will be incemented for every person
]).pretty()  //# here we get state with state name and the count of persons who is female

//* $sort
db.persons.aggregate([
  { $match: { gender: "female" } },
  { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
  { $sort: { totalPersons: -1 } }                                                  //# here we can see that we are sorting with available fields from grouping
]).pretty()

//* $project 
db.persons.aggregate([
  { $project: { _id: 0, gender: 1, fullName: { $concat: ["$firstName", " ", "$lastName"] } } }]).pretty() //# we can add new fields other than turning or turning off the existing, we cac hard code the value or we can concadinate something
//* $concat for concatinating two values
db.persons.aggregate([{ $project: { _id: 0, gender: 1, fullName: { $concat: [{ $toUpper: "$firstName" }, " ", { $toUpper: "$lastName" }] } } }]).pretty() //# we can convert to uppercase and concatinate

db.persons.aggregate([{ $project: { _id: 0, gender: 1, fullName: { $concat: [{ $toUpper: { $substrCP: ["$firstName", 1, 0] } }, " ", { $toUpper: { $substrCP: ["$lastName", 0, 1] } }, { $strLenCP: "$firstName" }] } } }])
//#                                       substring, we can take specific substring↑      starting point ↑  ↑no of chrector                         ↑ to find the length of the text
https://docs.mongodb.com/manual/reference/operator/aggregation/project/

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      birthdate: { $convert: { input: '$dob.date', to: 'date' } }, //# birthdate: { $toDate: '$dob.date' } this will work as well(shortcut)
      age: "$dob.age",
      location: {
        type: 'Point',
        coordinates: [
          {
            $convert: { input: '$location.coordinates.longitude', to: 'double', onError: 0.0, onNull: 0.0 }  //# convert method can convert the type
          },
          {
            $convert: { input: '$location.coordinates.latitude', to: 'double', onError: 0.0, onNull: 0.0 }
          }
        ]
      }
    }
  },
  {
    $project: {      //# output of previous state will be the input of the next state
      gender: 1,       //? here gender will not be shown?
      email: 1,
      location: 1,
      birthdate: 1,
      age: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1,
              { $subtract: [{ $strLenCP: '$name.first' }, 1] }
            ]
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          {
            $substrCP: [
              '$name.last',
              1,
              { $subtract: [{ $strLenCP: '$name.last' }, 1] }
            ]
          }
        ]
      }
    }
  },
  { $group: { _id: { birthYear: { $isoWeekYear: "$birthdate" } }, numPersons: { $sum: 1 } } }, //# we can onlso filter date of year using $isoWeekYear operator
  { $sort: { numPersons: -1 } }
]).pretty();

//* Group is for grouping multiple documents into one document, whereas project is a one to one relation, you get one document and then you will return one document, that one document we'll just have changed.
//* So in grouping, you do things like summing, counting, averaging and so on, in projection phases, you transform a single document, you add new fields and so on.
friends.json
db.friends.aggregate([
  { $unwind: "$hobbies" },  //# using $unwind we can unwrapp an array and display
  { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } }
]).pretty();

db.friends.aggregate([
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } } //# we can use addToSet operator for avoiding duplication
]).pretty();

db.friends.aggregate([
  { $project: { _id: 0, examScore: { $slice: ["$examScores", 2, 1] } } }   //# $slice will take only specific element from the array. { $slice: ["$examScores", 1] } this takes only first element { $slice: ["$examScores", 2, 1] } here we pass second parameter as starting position and third parameter is totell how may items we need to pull
]).pretty();

db.friends.aggregate([
  { $project: { _id: 0, numScores: { $size: "$examScores" } } }  //# $size operator will give the size of an array
]).pretty();


db.friends.aggregate([
  {
    $project: {
      _id: 0,
      scores: { $filter: { input: '$examScores', as: 'sc', cond: { $gt: ["$$sc.score", 60] } } } //# we can add filters as well ($$sc is mentioned to tell it is a temporary variable) (we are checking the items in an array(multiple documents) having score more than 60)
      //#      Input variable↑  temporary variable↑        ↑condition     ↑selecting temp var
    }
  }
]).pretty();
https://docs.mongodb.com/manual/reference/operator/aggregation/cond/
friends.json // trying to show the max score and name from the array of scores
db.friends.aggregate([
  { $unwind: "$examScores" }, //# we can use unwrap here
  { $project: { _id: 1, name: 1, age: 1, score: "$examScores.score" } },
  { $sort: { score: -1 } },
  { $group: { _id: "$_id", name: { $first: "$name" }, maxScore: { $max: "$score" } } }, //# $first will select the first element $max will find the maximum value
  { $sort: { maxScore: -1 } }
]).pretty();

//* Buckets - we can define some boundaries and distribute the values through those groups
db.persons
  .aggregate([
    {
      $bucket: {
        groupBy: '$dob.age',
        boundaries: [18, 30, 40, 50, 60, 120],
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: '$dob.age' }
        }
      }
    }
  ])
  .pretty();

db.persons.aggregate([
  {
    $bucketAuto: {                   //# this will auto generate a bucket
      groupBy: '$dob.age',
      buckets: 5,          //# this is number of boundaries we want
      output: {
        numPersons: { $sum: 1 },
        averageAge: { $avg: '$dob.age' }
      }
    }
  }
]).pretty();

//! order of aggregate matters !!!!!!!!
db.persons.aggregate([
  { $match: { gender: "male" } },
  { $project: { _id: 0, gender: 1, name: { $concat: ["$name.first", " ", "$name.last"] }, birthdate: { $toDate: "$dob.date" } } },
  { $sort: { birthdate: 1 } },
  { $skip: 10 },
  { $limit: 10 }
]).pretty();
https://docs.mongodb.com/manual/core/aggregation-pipeline-optimization/

//* $out aggregate for saving a specific aggregate - I think it works more like a Stored Procedure
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      birthdate: { $toDate: '$dob.date' },
      age: "$dob.age",
      location: {
        type: 'Point',
        coordinates: [
          {
            $convert: {
              input: '$location.coordinates.longitude',
              to: 'double',
              onError: 0.0,
              onNull: 0.0
            }
          },
          {
            $convert: {
              input: '$location.coordinates.latitude',
              to: 'double',
              onError: 0.0,
              onNull: 0.0
            }
          }
        ]
      }
    }
  },
  {
    $project: {
      gender: 1,
      email: 1,
      location: 1,
      birthdate: 1,
      age: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1,
              { $subtract: [{ $strLenCP: '$name.first' }, 1] }
            ]
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          {
            $substrCP: [
              '$name.last',
              1,
              { $subtract: [{ $strLenCP: '$name.last' }, 1] }
            ]
          }
        ]
      }
    }
  },
  { $out: "transformedPersons" }     //# we can use $out keyword to do it
])


//! Numbers in MongoDB
//* Integers(int32) - full numbers
//* Longs(int64) - full numbers
//* Doubles(64bit) - number with decimal places - decimal values are approximated
//* High Precision Doubles(128bit) - number with decimal places - decimal values are with high precisions
//* default type of number in mongoShell(javascript as well) is double so 1 is 1.00 
//* we can use NumberInt(10) as well .this takes lower size
//* we can use NumberLong(10) as well .this takes lower size

NumberLong("687878787887878") //# we should pass as a string, for numberInt as well // limitation of javascript
numberDecimal() //# High Precision Doubles(128bit), more size is preserved for this type
https://stackoverflow.com/questions/618535/difference-between-decimal-float-and-double-in-net
https://social.msdn.microsoft.com/Forums/vstudio/en-US/d2f723c7-f00a-4600-945a-72da23cbc53d/can-anyone-explain-clearly-about-float-vs-decimal-vs-double-?forum=csharpgeneral
https://docs.mongodb.com/manual/tutorial/model-monetary-data/


//! security in MongoDB

//* Authorization and authontication
//* Transport encryption
//* encryption in rest
//* auditing
//* server and network config setup
//* backup and updates

//* Authorization and authontication
//# Authentication is all about identifying users in your database, authorization on the other hand is all about identifying what these users may then actually do in the database,
//# user can have roles and previlages
//# previlages can have resources(db or collections) and actions(update, delete)

createUser()
updateUser()


//# switch to admin database
//# create user
db.createUser({ user: "max", pwd: "ppp", roles: ["userAdminAnyDatabase"] })   //# to create a db

db.auth("username", "password")

//* buildin roles
//# database Userm - read and readWrite roles
//# database admin - dbAdmin, userAdmin, dbOwner
//# All database Roles - readAnyDatabase.readWriteAnyDatabase,userAdminAnyDatabase,dbAdminAnyDatabase
//# Cluster Admin - clusterManager,clusterMonitor ,hostManager ,clusterAdmin 
//# Backup/ Restore - backup ,restore 
//# superUser - dbOwner (admin),userAdmin (admin),userAdminAnyDatabase, 

//* mong -u username -p password --authenticationDatabase admin(we can specify the db) --- for login


//* readWrite role will by default create the user for the selected DB, not for every db

db.updateUser("username", { roles: ["readWrite", { role: "readWrite", db: "anotherdbname" }] }) //# we can give access to another db as well


//* transport Encryption :(
//* encryption at rest - storage encryption - only for pro user :( , but we can encrypt specific fields, like password

// Official "Encryption at Rest" Docs: https://docs.mongodb.com/manual/core/security-encryption-at-rest/

// Official Security Checklist: https://docs.mongodb.com/manual/administration/security-checklist/

// What is SSL/ TLS? => https://www.acunetix.com/blog/articles/tls-security-what-is-tls-ssl-part-1/

// Official MongoDB SSL Setup Docs: https://docs.mongodb.com/manual/tutorial/configure-ssl/

// Official MongoDB Users & Auth Docs: https://docs.mongodb.com/manual/core/authentication/

// Official Built-in Roles Docs: https://docs.mongodb.com/manual/core/security-built-in-roles/

// Official Custom Roles Docs: https://docs.mongodb.com/manual/core/security-user-defined-roles/


//! performance
//* capped database - it will cler the old documents, after the limited size
db.createCollection("name", { capped: true, size: 1000, max: 3 }) //# size is in bytes, maz is the maximum number of documents

//* replica sets - we can create multiple nodes (secondary nodes) which iss like another server, and the data insertion will happen asynchronosly in these nodes
//* if primary server became offline, we can use secondary server as backup and keep the application running
//* or we can use this servers to improve performance, we can do writing from primary server and reading from the secondary server
https://docs.mongodb.com/manual/replication/


//*
//* and that is really important to understand. With sharding, you have multiple computers who all run mongodb servers but these serverss don't work standalone but work together and split up the available data, so the data is distributed across your shards, not replicated.

//* sharding -- adding more storages
https://docs.mongodb.com/manual/sharding/

//! Transactions
//* we need mongoDB 4 for  transactions and replica sets as well
const session = db.getMongo().startSession() //# created a session

const postsColl = session.getDatabase("blog").posts //# selected db using the session
const usersColl = session.getDatabase("blog").users
session.startTransaction() //# started the transactions

usersColl.deleteOne({ _id: ObjectId("5ba@adfacfd31f948ed7e") })
postsColl.deleteOne({ _id: ObjectId("5ba@adfacfd31f948ed7e") })
https://docs.mongodb.com/manual/core/transactions/









