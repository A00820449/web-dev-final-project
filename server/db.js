const mongoose = require("mongoose");

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/test"

mongoose.connect(mongoConnectionString, ()=>{
    console.log('Connected to database');
});

module.exports = {};