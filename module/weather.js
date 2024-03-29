'use strict';

let cache = require('./cache.js');
const axios = require('axios');

async function getWeather(request, response, next) {
/* These lines are extracting the latitude and longitude values from the query parameters of the
incoming HTTP request. The `request` object contains information about the incoming request, and the
`query` property of this object contains an object of key-value pairs of the query parameters. The
`lat` and `lon` variables are being assigned the values of the `lat` and `lon` query parameters,
respectively. */
  let lat = request.query.lat
  let lon = request.query.lon
  const key = 'weather-' + lat + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_API_KEY}&days=5&units=I`;

  try {

    if (cache[key] && (Date.now() - cache[key].timestamp < 20000)) {
      console.log('Cache hits the weather and scores!');
      response.status(200).send(cache[key].data);
    } else {
      console.log('Cache swings and a miss! ');
      cache[key] = {};
      cache[key].timestamp = Date.now();

      let results = await axios.get(url);
      let dataToSend = results.data.data.map(weatherObj => new Forecast(weatherObj));
      cache[key] = {
        data: dataToSend,
        timestamp: Date.now()
      };
      response.status(200).send(dataToSend);
    }
  } catch (error) {
    response.status(500).send('error: Sorry, something went wrong. ');
  }

}

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description
    this.lowTemp = weatherObj.low_temp;
    this.highTemp = weatherObj.high_temp;
  }
}


module.exports = getWeather;
