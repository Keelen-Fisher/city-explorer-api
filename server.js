'use strict';

console.log('testing testing, is this thing on? or not?');

// REQUIRES - 

//  We use require instead of import 
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
// Invoke the library,  so app will become our server.
const app = express();
// middleware to share resources across the internet: The most important job for middleware is to stop the request incase theres an error in the require.  
app.use(cors());
let PORT = process.env.PORT || 3005;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// ROUTES 

// Base route
// Proof of Life

//.get: One of the REST API, the rest contains watys to request informaton in the query. 
// This wiil become the movie api.
app.get('/', (request, response) => {
  console.log('This works!');
  response.status(200).send('Welcome to our server');
});

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// ROUTE FOR APIs' 


// app.get('/', (request, response) => {
// console.log('This works!');
// response.status(200).send('Welcome to our server');
// });
// 


// for the weather API info: 
// let lat = request.query.lat
// let lon = request.query.lon
// http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=16&lat=${lat}&lon=${lon}


app.get('/weather', newWeather);

async function newWeather(request, response) {
  try {
    let showResults = await axios.get(url);
    let searchQuery = request.query.searchQuery;
    let lat = request.query.lat
    let lon = request.query.lon
    console.log(searchQuery);

    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API_KEY}&units=I&days=16&lat=${lat}&lon=${lon}`

    let dataToSend = showResults.data.data.map(object => new Forecast(object));
    response.status(200).send(dataToSend);


  }
  catch (error) {
    response.status(500).send('error: Sorry, something went wrong. ');
  };
}

// ---------------------------------------------------Movies--------------------------------------------------------------


app.get('/movies', newMovie);

async function newMovie(request, response) {
  let city = request.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${city}`;
  try 
  {
    let showMovie = await axios.get(url);
    console.log(searchQuery);

    let dataToSend = showMovie.data.results.map(object =>  new Showtimes(object));
    console.log(dataToSend);
    response.status(200).send(dataToSend);
  }

  catch (error) {
    response.status(500).send('error: Sorry, something went wrong. ');
  };
}
// ----------------------- Creating Classes:-------------------------------------------------------------------------

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
    this.lowTemp = weatherObj.low_temp;
    this.highTemp = weatherObj.high_temp;
  }
};

class Showtimes {

  constructor(movieObj) {
    this.imgUrl = `https://image.tmdb.org/t/p/w500${movieObj.poster_path};`
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.release_date = movieObj.release_date;
    this.popularity = movieObj.popularity;
    this.totalVotes = movieObj.vote_count;
    this.vote_avg = movieObj.vote_average;
  }
};


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


app.listen(PORT, () => console.log(`We are up onn PORT: ${PORT}`));