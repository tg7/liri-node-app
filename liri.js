//Global Require Variables
var keys = require('./keys.js');
var Twitter = require('twitter');
var fs = require('fs');
var spotify = require('spotify');
var request = require('request');

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

// Start Of Functions 

var twitterFunction = function() {
    var userID = process.argv[3] || 'KingJames'
    var params = { screen_name: userID };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < 20; i++) {
                  console.log(tweets[i].text);
        }
      }
    });
};

var spotifyFunction = function() {
    var songInput = process.argv[3] || 'What\'s My Age Again by Blink 182';
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
    var movieInput = process.argv[3] || 'Mr. Nobody'
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

// If Else Statement To Determine Node Functionality
if (userInput1 === 'my-tweets') {
    twitterFunction();

} else if (userInput1 === 'spotify-this-song') {
    spotifyFunction();

} else if (userInput1 === 'movie-this') {
    imdbFunction();

} else if (userInput1 === 'do-what-it-says') {
    randomFunction();
};
