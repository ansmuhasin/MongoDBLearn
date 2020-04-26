using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MongoDB
{
    class Program
    {
        static void Main(string[] args)
        {
            User user = new User()
            {
                Name = "shamal",
                Age = 23,
                Address = new Address()
                {
                    City = "moonnu",
                    StreetAddress = "Thrissure",
                    ZipCode = 34324324
                }
            };
            BsonDocument document = new BsonDocument().Set("Name", "Shafil").Set("Age", 25);
                document["Address"] = new BsonDocument().Set("City", "moonnu").Set("StreetAddress", "Thrissure").Set("ZipCode",657867);
            MongoConnect localMongoConnect = new MongoConnect("AddressBook", "Users");
            MongoConnect atlasMongoConnect = new MongoConnect("AddressBook", "Users", "mongodb+srv://dbLearningUser:TdBQSCYcTrsQch7H@artfox-dev-ivrcp.mongodb.net/test?retryWrites=true&w=majority");
            localMongoConnect.InsertRecord<User>(user);
            localMongoConnect.InsertRecord<BsonDocument>(document);
            atlasMongoConnect.InsertRecord<User>(user);
            atlasMongoConnect.InsertRecord<BsonDocument>(document);

        }
    }
}
