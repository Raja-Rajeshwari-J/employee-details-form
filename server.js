const express = require('express');
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const app = express();

const router = require("./user/user.routers.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join('__dirname, ')));

app.use("/api",router);

app.listen(process.env.PORT, ()=>{
    console.log("listening on port " + process.env.PORT);
})
