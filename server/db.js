const mongoose = require("mongoose");

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/test"

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    isAdmin: Boolean,
});
const User = mongoose.model("User", userSchema);

mongoose.connect(mongoConnectionString, ()=>{
    console.log('Connected to database');
});

module.exports = {User};