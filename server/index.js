const express = require("express");
const cors = require("cors");

const app = express();


const PORT = parseInt(process.env.PORT) || 3001;

app.use(cors());

app.get("/test",(req, res)=>{
    res.json({hello: "world"});
});

app.listen(PORT, ()=>{
    console.log(`Listening on:`, PORT);
})