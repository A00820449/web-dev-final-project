require('dotenv').config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const { User } = require("./db.js");

const app = express();

const PORT = parseInt(process.env.PORT) || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

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
    
    const token = jwt.sign({_id: user._id.toString(), username: user.username, isAdmin: user.isAdmin}, JWT_SECRET, {expiresIn: "30d"});

    return res.json({error: false, message: "Success", token, username});
});

app.get("/sync", async (req, res)=>{
    const token = req.headers["authorization"]?.match(/^Bearer ([A-Za-z0-9-_.]+)$/)?.[1] || "";
    const username = req.query.username || "";

    console.log(req.headers);
    console.log(req.params);

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    if (!username) {
        return res.sendStatus(400); // Bad request
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.username !== username) {
            return res.sendStatus(403); // Forbidden
        }

        const user = await User.findOne({username});
        
        if (!user) {
            return res.sendStatus(404); // Not found
        }
        
        const list = user.todos || [];

        return res.json(list);

    }
    catch(e) {
        console.error(e);
        return res.sendStatus(401); // Unauthorized
    }

});

app.listen(PORT, ()=>{
    console.log(`Listening on:`, PORT);
})