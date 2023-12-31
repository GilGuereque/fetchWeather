const express = require('express');
const app = express();
const PORT = 3000;
const axios = require('axios');

require('dotenv').config();

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
app.use(express.json()); 

// Render page using GET function
app.get('/', async (req, res) => {
    try {
        res.render('index.ejs', { city: '', weather: '', conditions: '', humidity: '', region: '', localTime: '' }); // Initialize both city & weather
    } catch (error) {
        console.error(error)
        res.status(500).send('500 HTTP status code. A server error has ocurred from the GET request');
    }
});

// POST request to fetch City & weather data
app.post('/getWeather', async (req, res) => {
    const city = req.body.city;

    try {
        // API
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`);     

        // Extract weather data
        const weather = response.data.current.temp_f; // Example: get the weather description
        const conditions = response.data.current.condition.text; // get the conditions text field
        const humidity = response.data.current.humidity; // get humidity data
        const region = response.data.location.region; // get region data
        const localTime = response.data.location.localtime // get local time data

        // Render page with the city & weather data
        res.render('index.ejs', { city, weather, conditions, humidity, region, localTime })
    } catch (error) {
        console.log(error);
        // Handle the error appropriately
        res.render('index.ejs', { city: '', weather: 'Weather data not found', conditions: 'Weather conditions data not found', humidity: 'humidity data not found', region: 'region not found', localTime: 'time not found' });
    }
    
});


// Setting up app to listen on PORT 5500
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
});