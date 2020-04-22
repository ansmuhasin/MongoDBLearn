friends.json

db.friends.aggregate([{ $project: { _id: 0, maxScore: { $filter: { $input: "examScores.score", as: "sc", $cond: {} } } } })