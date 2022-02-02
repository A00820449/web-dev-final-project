const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const PORT = parseInt(process.env.PORT) || 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/test",(req, res)=>{
    res.json({hello: "world"});
});

app.listen(PORT, ()=>{
    console.log(`Listening on:`, PORT);
})