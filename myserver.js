'use strict';

console.log('testing testing, is this thing on? or not?');

// REQUIRES - 
//  We use require instead of import 
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const getWeather = require('./myweather.js');
const getMovie = require('./module/movies.js')

// Invoke the library,  so app will become our server.
const app = express();

// middleware to share resources across the internet: The most important job for middleware is to stop the request incase theres an error in the require.  
app.use(cors());
let PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`We are up onn PORT: ${PORT}`));


// ----------------------------------------------------------------------------Moved weather and movie async functions to seperate js files --------------------------------------------------------//

// ROUTES 
// Base route
// Proof of Life
//.get: One of the REST API, the rest contains watys to request informaton in the query. 
// This wiil become the movie api.
app.get('/', (request, response) => {
  console.log('This works!');
  response.status(200).send('Welcome to our server');
});

// ---------------------------Weather-----------------------------------------//
app.get('/weather', getWeather);


// ---------------------------Movies--------------------------------------------//
app.get('/movies', getMovie);

// ----------------------- Creating Classes/ Moved to seperate files:-----------//


// Catch all - needs to be at the bottom:
app.get('*', (request, response) => {
  console.log('This also works, but that is a bad thing!')
  response.status(404).send('This route does not exist');
});


// ERRORS
// Handle any errors
app.use((error, request, response) => {
  response.status(500).send('error: Sorry, something went wrong. ');
});

