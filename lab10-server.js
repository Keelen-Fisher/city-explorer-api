// // Don't forget to rename this file as "server.js"
// 'use strict';

// require('dotenv');
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const weather = require('./modules/myweather.js');
// const app = express();
// //Implementing Middleware:
// app.use(cors());
// let PORT = process.env.PORT || 3005


// app.get('/weather', weatherHandler);

// function weatherHandler(request, response) {
//   const { lat, lon } = request.query;
//   weather(lat, lon)
//   .then(summaries => response.send(summaries))

//   .catch((error) => {
//     console.error(error);
//     response.status(200).send('Sorry. Something went wrong!')
//   });
// }  

// app.listen(PORT, () => console.log(`Server up on ${PORT}`));