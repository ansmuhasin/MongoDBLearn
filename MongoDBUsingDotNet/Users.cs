using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace MongoDB
{
    public class User
    {
        [BsonId]
        public ObjectId ID { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public Address Address { get; set; }
    }
}
