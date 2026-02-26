import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_STRING;
if(!MONGODB_URI){
    throw new Error("Please define DB URI");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {
        conn : null,
        promise : null
    }
}


async function dbconnect() {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName : "mydb",
        })
    }

    cached.conn = await cached.promise;
    return cached.conn;
}


export default dbconnect;