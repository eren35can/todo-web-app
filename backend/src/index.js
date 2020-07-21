require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require("./routers/todoRouter");
const cors = require('cors');

const app = express();

// for connection between frontend
app.use(cors());

// Configure body-parser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use Api routes in the App
app.use('/api/todos', todoRoutes);

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!')
})

const uri = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URI : process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true,
    useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});

module.exports = app;