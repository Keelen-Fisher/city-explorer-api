// 'use strict';

// const axios = require('axios');
// // Require: Global Object variable
// let cache = require('./cache.js');

// async function getMovie(request, response, next) {
//   let city = request.query.city;
//   let url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=1&query=${city}`;
//   console.log('This is the movie url: ', url);

//   // 



//   try {
//     let showMovie = await axios.get(url);
//     // console.log(city);
//     // Whenever you are declaring an await, you must always put in .data in the .map function presented down below and then .<name of the array inside of an object>
//     let dataToSend = showMovie.data.results.map(movieObj => new Showtimes(movieObj));
    
//     response.status(200).send(dataToSend);
//     console.log('Movie: ', showMovie);
//   }
//   catch (error) {
//     response.status(500).send('error: Sorry, something went wrong. ');
//   };
// };

// class Showtimes {

//   constructor(movieObj) {
//     //template literal: ${} 
//     this.imgUrl = `https://image.tmdb.org/t/p/w500${movieObj.poster_path};`
//     this.title = movieObj.title;
//     this.overview = movieObj.overview;
//     this.release_date = movieObj.release_date;
//     this.popularity = movieObj.popularity;
//     this.totalVotes = movieObj.vote_count;
//     this.vote_avg = movieObj.vote_average;
//   }
// }


// module.exports = getMovie;
