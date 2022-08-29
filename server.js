// Don't forget to rename this file as "server.js"
// setting cache equal to an object literal
// Within the object of cache, need to have a custom key for each route and search results

// Creating conditional statements
// if..... then send the data 
  // in your if, parmeters will contain your (cache[key]). implement your && with the value Date.now() - cache[key].timeStamp < 1000 * 60)){}
  // Now you're going to do your respond.status(200).send(cache[key].data)

// else......send the data from your previous labs. (Will be from your url, await axios and response.status(200).send(<variable>))

// setting cache equal to an object literal
// Within the object of cache, need to have a custom key for each route and search results

'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
let PORT = process.env.PORT || 3005;
const getMovie = require('./module/movieCache.js')

const getWeather = require('./module/weather.js');
app.get('/', (request, response) => {
  response.status(200).send('This server and API is active!');
});
app.get('/weather', getWeather);

app.get('/movies', getMovie);

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});



// app.get('/weather', weatherHandler);

// function weatherHandler(request, response) {
  // const { lat, lon } = request.query;
  // weather(lat, lon)
  // .then(summaries => response.status(200).send(summaries))
  // .catch((error) => {
    // console.error(error);
    // response.status(200).send('Sorry. Something went wrong!')
  // });
// }  

app.listen(PORT, () => console.log(`Server up on ${PORT}`));