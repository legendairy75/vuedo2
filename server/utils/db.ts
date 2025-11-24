// Import mongoose modual
import mongoose from "mongoose";

// if theres no MONGO_URI in .env use localhost/voodo
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/voodo";

let isConnected = false; // connection to mongo starts as fauls

// function to conect to mongo
export async function connectToDB() {
    if (isConnected) return; // If already connected to mongo, stop function

    try {
        await mongoose.connect(MONGO_URI) //connect to mongo
        isConnected = true;
        console.log("MongoDB Connected");
    } catch (error) {
        console.log('Mongo connection error:',error);
    }
}