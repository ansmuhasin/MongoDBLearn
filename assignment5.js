use sportsDB
db.sports.updateOne({ title: "football" }, { $set: { isTeamRequered: true } }, { $upsert: true })
db.sports.updateOne({ title: "chess" }, { $set: { isTeamRequered: false } }, { $upsert: true })
db.sports.updateOne({ isTeamRequered: true }, { $set: { minimumNumberOfPlayers: 2 } })
db.sports.updateOne({ isTeamRequered: true }, { $inc: { minimumNumberOfPlayers: 9 } })