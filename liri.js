//Global Require Variables
var keys = require('./keys.js');
var twitter = require('twitter');
var fs = require('fs');

console.log(twitter);
console.log(keys);

//Assigning Values to arguments in terminal
var type = process.argv[2];
var argument = process.argv[3];

//Assigned a new object using the exported keys object
var T = new Twitter ({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

//If else statement to determine what to print if typed in terminal by the user
if (type === 'my-tweets') {
  console.log('i work');
  // Do Twitter Function
} if (type === 'spotify-this-song') {

  // Do Spotify Function
} if (type === 'movie-this') {

  // Do Movie Function
} if (type === 'do-what-it-says') {

  // Do Random Function
}


