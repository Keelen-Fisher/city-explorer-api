'use strict';

console.log('testing testing, is this thing on?');

// REQUIRES - 
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const { response } = require('express');

const app = express();

// middleware to share resources across the internet 
app.use(cors());

let PORT = process.env.PORT || 3005;


// ROUTES 

// Base route
// Proof of Life
// app.get('/', (request, response) => {
  // response.status(200).send('Welcome to our server');
// });
// 
// Catch all - needs to be at the bottom:
// app.get('*', (request, response)=>{
  // response.status(404).send('This route does not exist');
// });
// 
// 

app.get('/weather', (request, response)=>{
  let climate = request.searchQuery;
  // console.log(climate);
  let dataToCover = data.find(weather => weather.climate === climate);
  let dataToSend = new Forecast(dataToCover);
  response.status(200).send(dataToDeliver);
});

class Forecast {
  constructor(weatherObj){
    this.valid_date = weatherObj.date;
    this.description = weatherObj.description;
  }
};

// Catch all - needs to be at the bottom:
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// ERRORS
// Handle any errors
app.use((error, request, response, next)=> {
  response.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`We are up onn PORT: ${PORT}`));