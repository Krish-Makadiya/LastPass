const express = require("express");
require("dotenv").config();
const { connectDB } = require("./config/connectDB");
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

connectDB();

app.use('/api/v1', routes);

app.get("/", (req, res) => {
    res.send("Welcome to my Server!");
});

const port = process.env.PORT;
app.listen(4000, () => {
    console.log(`Server is running on port: 4000`);
});
