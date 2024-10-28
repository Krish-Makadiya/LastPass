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

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});