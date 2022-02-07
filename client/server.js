require("dotenv").config();

const express = require("express");
const path  = require("path");

const PORT = parseInt(process.env.SERVER_PORT) || 3000;
const BUILD_DIR = path.resolve(__dirname, "build");
const INDEX_FILE = path.resolve(BUILD_DIR, "index.html");

const app = express();

app.use(express.static(BUILD_DIR));

app.get("*",(req,res)=>{
    res.sendFile(INDEX_FILE);
});

app.listen(PORT, ()=>{
    console.log("Listening on", PORT);
});