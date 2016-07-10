//Global Require Variables
var keys = require('./keys.js');
var Twitter = require('twitter');
var fs = require('fs');
var spotify = require('spotify');

//Assigning Values to arguments in terminal
var userInput1 = process.argv[2];

//Assigned a new object using the exported keys object
var client = new Twitter ({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

//If else statement to determine what to print if typed in terminal by the user
if (userInput1 === 'my-tweets') {
    var userID = process.argv[3] || 'KingJames'
    var params = { screen_name: userID };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < 20; i++) {
                  console.log(tweets[i].text);
        }
      }
    });

} if (userInput1 === 'spotify-this-song') {
    var userInput2 = process.argv[3] || 'What\'s My Age Again by Blink 182'
    spotify.search({ type: 'track', query: userInput2 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
      for (var i = 0; i < 5; i++) {
            console.log('---------------------------------------');
            console.log('Song Name: ' + data.tracks.items[i].name);
            console.log('Preview Link: ' + data.tracks.items[i].preview_url);
            console.log('Album Name: ' + data.tracks.items[i].album.name);

        for( var k = 0; k < data.tracks.items[k].artists.length; k++) {
            console.log('Artist Name: ' + data.tracks.items[i].artists[k].name);
            console.log('---------------------------------------');
        }
      }
}); 

  // Do Spotify Function
} if (userInput1 === 'movie-this') {

  // Do Movie Function
} if (userInput1 === 'do-what-it-says') {

  // Do Random Function
}

