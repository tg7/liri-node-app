// Global require variables
var keys = require('./keys.js');
var Twitter = require('twitter');
var fs = require('fs');
var spotify = require('spotify');
var request = require('request');

// Assigned values to movie and song inputs
var movieInput;
var songInput;

// Assignined value to argument in terminal
var userInput1 = process.argv[2];

// Assigned twitterInput to the third argument in the terminal
var twitterInput = process.argv[3];

// Assigned a new object using the exported keys object
var client = new Twitter ({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

// Start of functions 
var twitterFunction = function() {
    var userID = twitterInput || 'KingJames'
    var params = { screen_name: userID };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < 20; i++) {
                   console.log(tweets[i].text);
                   console.log('---------------------------------------');
        }
      }
    });
};

var spotifyFunction = function() {
    // Takes all arguments and creates one string allowing more than one word to be searched
    var songArgs = [process.argv[3], process.argv[4], process.argv[5], process.argv[6], process.argv[7]];
    var joinedArgs = songArgs.join(' ');

    // If/else statement to seperate default undefined value and joined arguements if typed into terminal
    if (process.argv[3] === undefined) {
        songInput = 'What\'s My Age Again by Blink 182';
    } else {
        songInput = joinedArgs;
    }

    spotify.search({ type: 'track', query: songInput }, function(err, data) {
    
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
      for (var i = 0; i < 5; i++) {
            console.log('---------------------------------------');
            console.log('Song Name: ' + data.tracks.items[i].name);
            console.log('Album Name: ' + data.tracks.items[i].album.name);
            console.log('Preview Link: ' + data.tracks.items[i].preview_url);

        for (var k = 0; k < data.tracks.items[k].artists.length; k++) {
            console.log('Artist Name: ' + data.tracks.items[i].artists[k].name);
            console.log('---------------------------------------');
        }
      }
    }); 
}; 

var imdbFunction = function() {
    var movieArgs = [process.argv[3], process.argv[4], process.argv[5], process.argv[6], process.argv[7]];
    var allArgs = movieArgs.join(' ');

    // If/else statement to seperate default undefined value and joined arguements if typed into terminal
    if (process.argv[3] === undefined) {
          movieInput = 'Mr. Nobody';
    } else {
          movieInput = allArgs;
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=small&r=json";

    request(queryURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {

      // Variable to describe shorten the JSON Parse for the body
      var format = JSON.parse(body);
      console.log("Title: " + format.Title + 
                  "\nYear: " + format.Year +
                  "\nIMDB Rating:" + format.imdbRating +
                  "\nCountry " + format.Country +
                  "\nLaunguage: " + format.Launguage +
                  "\nPlot: " + format.Plot +
                  "\nActors: " + format.Actors); 
      }
    });
};

var randomFunction = function() { 

    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {

          console.log('Error Occurred' + err);
          return;
        } else 
          
          data = data.split(',');
            split1 = data[0];
            split2 = data[1];

            // New variation of the Spotify function using the split data from random.txt
            var useInput = function() {

            spotify.search({ type: 'track', query: split2 }, function(err, data) {
    
             if ( err ) {
                console.log('Error occurred: ' + err);
                  return;
              }       
                      console.log('---------------------------------------');
                      console.log('Song Name: ' + data.tracks.items[0].name);
                      console.log('Album Name: ' + data.tracks.items[0].album.name);
                      console.log('Preview Link: ' + data.tracks.items[0].preview_url);
                      console.log('Artist Name: ' + data.tracks.items[0].artists[0].name);
                      console.log('---------------------------------------');
                  
              
              }); 

            }
            useInput();
    });
};

// If else statement to determine node functionality
if (userInput1 === 'my-tweets') {
    twitterFunction();

} else if (userInput1 === 'spotify-this-song') {
    spotifyFunction();

} else if (userInput1 === 'movie-this') {
    imdbFunction();

} else if (userInput1 === 'do-what-it-says') {
    randomFunction();
};
