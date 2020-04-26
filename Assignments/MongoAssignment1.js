show dbs
var db = use patients
db.patientData.insertMany([{ firstName: "ans", secondName: "Muhasin", age: 24, history: [{ decease: "fever", deceaseID: 1 }, { decease: "headache", deceaseID: 2 }, { decease: "cold", deceaseID: 3 }] },
{ firstName: "vinayak", secondName: "vinayak", age: 25, history: [{ decease: "fever", deceaseID: 1 }, { decease: "leg Pain", deceaseID: 5 }, { decease: "stoach pain", deceaseID: 6 }] },
{ firstName: "prashin", secondName: "raj", age: 23, history: [{ decease: "fever", deceaseID: 1 }, { decease: "stomach pain", deceaseID: 6 }, { decease: "eye pain", deceaseID: 7 }] }
])
db.patientData.updateOne({ firstName: "vinayak" }, { $set: { secondName: "dileep", age: 26, history: [{ decease: "fever", deceaseID: 1 }, { decease: "back pain", deceaseID: 5 }, { decease: "stoach pain", deceaseID: 6 }] } })
db.patientData.find({ age: { $gt: 24 } })