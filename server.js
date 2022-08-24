'use strict';

console.log('testing testing, is this thing on? or not?');

// REQUIRES - 
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

const app = express();

// middleware to share resources across the internet 
app.use(cors());

let PORT = process.env.PORT || 3005;


// ROUTES 

// Base route
// Proof of Life
app.get('/', (request, response) => {
  console.log('This works!');
  response.status(200).send('Welcome to our server');
});
// 
// Catch all - needs to be at the bottom:
// app.get('*', (request, response)=>{
// response.status(404).send('This route does not exist');
// });
// 
// 

app.get('/weather', (request, response) => {
  try 
  {
    let nameOCity = request.query.city;
    // console.log('weather.json: ', data[0])
    // console.log('parameters', request.params, request.query);
    let dataToCover = data.find(city => city.city_name === nameOCity);
    // console.log('This is climate', climate);
    let dataToSend = dataToCover.data.map(object => {
      return new Forecast(object);
    });
    response.status(200).send(dataToSend);
  }

  catch (error) 
  {
    next(error);
  };

});



class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
  }
};



// Catch all - needs to be at the bottom:
app.get('*', (request, response) => {
  console.log('This also works, but that is a bad thing!')
  response.status(404).send('This route does not exist');
});



// ERRORS
// Handle any errors
app.use((error, request, response, next) => {
  response.status(500).send('error: Sorry, something went wrong. ');
});



app.listen(PORT, () => console.log(`We are up onn PORT: ${PORT}`));