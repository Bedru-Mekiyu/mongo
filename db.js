const {MongoClient} = require("mongodb");

let dbConnection;
module.exports={
    connectToDb:(cb)=>{
MongoClient.connect('mongodb+srv://bedru:v9nK4GEdgVj2fJ6n@cluster0.thtkp7k.mongodb.net/')
        .then((client)=>{
dbConnection = client.db();
            return cb()
        })
        .catch(err=>{
            console.log(err)
            return cb(err)
        })
    },
    getDb:()=>dbConnection
}