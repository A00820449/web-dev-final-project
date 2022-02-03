const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/test"

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    passwordHash: String,
    isAdmin: Boolean,
});
userSchema.method("setPassword", async function (password){
    const hash = await bcrypt.hash(password, 10);
    this.passwordHash = hash;
    await this.save();
    return hash;
});
userSchema.method("validatePassword", async function (password){
    const match = await bcrypt.compare(password, this.passwordHash);
    return match;
});
const User = mongoose.model("User", userSchema);

const todoSchema = new mongoose.Schema({
    _id: String,
    title: {type: String, required: true},
    description: String,
    timestamp: {type: Date, default: Date.now},
    userId: String
});
const Todo = mongoose.model("Todo", todoSchema);

mongoose.connect(mongoConnectionString, ()=>{
    console.log('Connected to database');
});

module.exports = {User,Todo};