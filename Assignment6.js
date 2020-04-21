db.persons.aggregate([
    { $match: { age: { $gt: 50 } } },
    { $group: { _id: { gender: "$gender" }, totalPerson: { $sum: 1 }, avrgAge: { $avg: "$age" } } }
])