//Global Require Variables
var keys = require('./keys.js');
var Twitter = require('twitter');
var fs = require('fs');

//Assigning Values to arguments in terminal
var userInput1 = process.argv[2];
var userInput2 = process.argv[3];

//Assigned a new object using the exported keys object
var client = new Twitter ({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

//If else statement to determine what to print if typed in terminal by the user
if (userInput1 === 'my-tweets') {
    var params = { screen_name: 'KingJames' };
    client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
        for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text);
    }
  }
});
  console.log('i work');
  // Do Twitter Function
}if (userInput1 === 'spotify-this-song') {

  // Do Spotify Function
} if (userInput1 === 'movie-this') {

  // Do Movie Function
} if (userInput1 === 'do-what-it-says') {

  // Do Random Function
}
 
