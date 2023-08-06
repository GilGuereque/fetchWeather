const exp = require('constants');
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 5500

require('dotenv').config()

// Most likely not using this, but setting up just incase
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    });


// Setting up configurations & middleware for Express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json);