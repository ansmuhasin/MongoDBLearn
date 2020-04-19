TVShowsExtended.json
db.movies.find({ genre: { $size: 2 } })
db.movies.find({ "meta.aired": 2018 })
//// db.movies.find({$and:[{"meta.ratings":{$gt:8}},{"meta.ratings":{$gt:10}}]}).pretty() wrong
db.movies.find({ ratings: { $elemMatch: { $gt: 8, $lt: 10 } } })
