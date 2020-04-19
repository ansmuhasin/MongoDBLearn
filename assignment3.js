mongoimport - movieStars.json - d movies - c movies--jsonArray--drop
db.movies.find({ $and: [{ "meta.rating": { $gt: 9.2 } }, { "meta.runtime": { $lt: 100 } }] }).pretty()
db.movies.find({ $or: [{ "genre": "drama" }, { "genre": "action" }] }).pretty()
db.movies.find({ $and: [{ "genre": "drama" }, { "genre": "action" }] }).pretty()
db.movies.find({ $expr: { $gt: ["$visitors", "$expectedVisitors"] } }).pretty()