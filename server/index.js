require('dotenv').config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { User } = require("./db.js");

const app = express();

const PORT = parseInt(process.env.PORT) || 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/test",(req, res)=>{
    res.json({hello: "world"});
});

app.post("/auth", async (req,res)=>{
    const username = req.body.username.trim() || '';
    const password = req.body.password.trim() || '';

    if (!username || !password) {
        return res.status(400).json({error: true, message: "Invalid request"});
    }

    const count = await User.count({username});
    if (count !== 1) {
        return res.status(404).json({error: true, message: "Invalid user"});
    }

    const user = await User.findOne({username});
    const match = await user.validatePassword(password);

    if (!match) {
        return res.status(401).json({error: true, message: "Invalid password"});
    }
    
    return res.json({error: false, message: "Sucess", token: "1234"});
});

app.listen(PORT, ()=>{
    console.log(`Listening on:`, PORT);
})