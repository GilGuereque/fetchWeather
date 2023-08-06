const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 5500

require('dotenv').config()

// Most likely not using this, but setting up just incase
// let db,
//     dbConnectionStr = process.env.DB_STRING,
//     dbName = 'todo'

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`)
//         db = client.db(dbName)
//     });


// Setting up configurations & middleware for Express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

// GET request to render index.ejs
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// POST request to fetch weather data
app.post('/getWeather', (req, res) => {
    const city = req.body.city;
    // res.render('')
})


// Setting up app to listen on PORT 5500
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server runnin on port ${PORT}`)
});