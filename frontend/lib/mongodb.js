// lib/mongodb.js
// 'use client'; // Use 'use client' directive for components with client-side interactivity

import { MongoClient } from 'mongodb';
var mongo_username =encodeURIComponent(process.env.MONGODB_USERNAME)
var mongo_password =encodeURIComponent(process.env.MONGODB_PASSWORD)
var mongo_url=`mongodb://${mongo_username}:${mongo_password}@34.171.126.76:27017/?authSource=admin`

console.log(mongo_url)
const client = new MongoClient(mongo_url);
const clientPromise = client.connect();

export default clientPromise;
