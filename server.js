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

/* `require('dotenv').config()` loads environment variables from a .env file into process.env.
`express` is a Node.js web application framework that allows us to create server-side applications.
`cors` is a middleware that allows cross-origin resource sharing, which enables a web page to make
requests to a different domain than the one that served the web page. */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Invoke the library,  so app will become our server.
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
