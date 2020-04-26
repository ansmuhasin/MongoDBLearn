using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MongoDB
{
    public class MongoDBCrud
    {
        private IMongoDatabase _db;
        public MongoDBCrud(string databaseName)
        {
            MongoClient client = new MongoClient();
            _db = client.GetDatabase(databaseName);
        }
        public MongoDBCrud(string databaseName, string connectionString = null)
        {
            MongoClient client = new MongoClient(connectionString);
            _db = client.GetDatabase(databaseName);
        }


        public void InsertRecord<T>(string collectionName, T record)
        {
            var collection = _db.GetCollection<T>(collectionName);
            collection.InsertOne(record);
        }


        public void UpdateOne<T>(string collectionName, T record)
        {
            User user = new User()
            {
                ID = new ObjectId("5ea480061df2302c84bb9d23"),
                Name = "Suhail",
                Age = 22,
                Address = new Address()
                {
                    City = "Aravushala",
                    StreetAddress = "Thrissure",
                    ZipCode = 34324324
                }
            };
            var update = Builders<T>.Update.Set("Name", user.Name).Set("Age", user.Age).Set("Address.City", user.Address.City);
            var collection = _db.GetCollection<T>(collectionName);
            collection.UpdateOne(new BsonDocument("_id", user.ID), update);
        }

        public List<T> GetRecords<T>(string collectionName)
        {
            var collection =_db.GetCollection<T>(collectionName);
            return collection.Find(new BsonDocument()).ToList();
        }

        public T GetRecordByID<T>(string collectionName, ObjectId id)
        {
            var collection = _db.GetCollection<T>(collectionName);
            var filter = Builders<T>.Filter.Eq("_id", id);
            return collection.Find(filter).FirstOrDefault();
        }

        public void UpsertRecord<T>(string collectionName,ObjectId id, T record)
        {
            var collection = _db.GetCollection<T>(collectionName);
            collection.ReplaceOne(new BsonDocument("_id", id), record, new ReplaceOptions { IsUpsert = true });
        }

        public void DeleteRecord<T>(string collectionName,ObjectId id)
        {
            var collection = _db.GetCollection<T>(collectionName);
            collection.DeleteOne(new BsonDocument("_id", id));
        }
    }
}
