using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace MongoDB
{
    class MongoConnect
    {
        private MongoDBCrud _mongoDBCrud ;
        private string _collectionName;
        public MongoConnect(string dbName, string collectioname, string connectionString = null)
        {
            if (!string.IsNullOrEmpty(connectionString))
            {
            _mongoDBCrud = new MongoDBCrud(dbName, connectionString);
            }
            else
            {
                _mongoDBCrud = new MongoDBCrud(dbName);
            }
            _collectionName = collectioname;
        }

        public void InsertRecord<T>(T document)
        {
            
            _mongoDBCrud.InsertRecord(_collectionName, document);
            Console.ReadLine();
        }

        public void UpdateRecord()
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
            _mongoDBCrud.UpdateOne<User>(_collectionName, user);
            Console.ReadLine();
        }
        public void GetRecords()
        {

            List<User> users = _mongoDBCrud.GetRecords<User>(_collectionName);
            foreach (User user in users)
            {
                Console.WriteLine("Name: {0}, Age:{1},", user.Name, user.Age.ToString());
                if (user.Address != null)
                {
                    Console.Write(" StreetAddress: {0}, City:{1}, ZipCode:{2}",
                        user.Address.StreetAddress, user.Address.City, user.Address.ZipCode.ToString());
                }
            }
            Console.ReadLine();
        }
        public void GetRecordByID()
        {
            User user = _mongoDBCrud.GetRecordByID<User>(_collectionName, new ObjectId("dgfdgdfgdf"));
            Console.WriteLine("Name: {0}, Age:{1},", user.Name, user.Age.ToString());
            if (user.Address != null)
            {
                Console.Write(" StreetAddress: {0}, City:{1}, ZipCode:{2}",
                    user.Address.StreetAddress, user.Address.City, user.Address.ZipCode.ToString());
            }
            Console.ReadLine();
        }
        public void UpsertRecord()
        {
            User user = new User()
            {
                ID = new ObjectId("dsdsmdsdsdksd7dsdjsd8sjd"),
                Name = "ukru",
                Age = 21,
                Address = new Address()
                {
                    City = "aravu",
                    StreetAddress = "Thrissure",
                    ZipCode = 12345
                }
            };
            _mongoDBCrud.UpsertRecord<User>(_collectionName, user.ID, user);
            Console.ReadLine();
        }
        public void LocalInstanceDeleteRecord()
        {
            _mongoDBCrud.DeleteRecord<User>(_collectionName, new ObjectId("000000000000000000000000"));
        }
    }
}
