'use strict';

const axios = require('axios');

async function getWeather(request, response, next){
  try {
    let lat = request.query.lat
    let lon = request.query.lon
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_API_KEY}&days=16&units=I`
    console.log(url);
    let showResults = await axios.get(url);
    console.log(showResults.data);
    let dataToSend = showResults.data.data.map(object => new Forecast(object));
    response.status(200).send(dataToSend);
  }
  catch (error) {
    response.status(500).send('error: Sorry, something went wrong. ');
  }
}

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
    this.lowTemp = weatherObj.low_temp;
    this.highTemp = weatherObj.high_temp;
  }
}

module.exports = getWeather;


// for lab 09: TEST ALONG THE WAY:
//async function getWeather(request, response, next){
  // Move your async function newWeather into this bracket, and in the app.get() on line 54, add in the "getWeather" into the parameters .
  // Create a new file (optional, with a new folder) and place in the function in there. Don't forget the class extension with the function.
  // add in "const axios = require('axios');" at the top of your file and "module.exports=getWeather" at the bottom.
  // at the top of the server.js in the requires, include "const getWeather = require"
//}

// 