use companies
db.companies.insertOne({ _id: 1, name: "apple", position: 1, founded: 1970 })
db.companies.insertMany([{ _id: 3, name: "microsoft", position: 2, founded: 1965 }, { _id: 2, name: "nokia", position: 3, founded: 1960 }])
db.companies.insertMany([{ _id: 4, name: "mi", position: 4, founded: 1980 }, { _id: 3, name: "samsung", position: 3, founded: 1960 }, { _id: 5, name: "motorola", position: 5, founded: 1950 }])
db.companies.insertMany([{ _id: 6, name: "LG", position: 6, founded: 2000 }, { _id: 3, name: "samsung", position: 3, founded: 1960 }, { _id: 7, name: "honor", position: 7, founded: 2000 }], { writeConcern: { w: 0 } })
db.companies.insertMany([{ _id: 8, name: "abc", position: 2, founded: 1965 }, { _id: 9, name: "qwe", position: 3, founded: 1960 }], { writeConcern: { w: 0, j: true } })