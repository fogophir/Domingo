var responseBuilder = require('./responsebuilder.js');

var https = require('https');

function getTweets(accessToken, searchParams, callback) {
	var tweets = '';
	var queryParams = '';
	
	// Build query params for twitter
	if (searchParams.hasOwnProperty('q')) {
		queryParams = 'q=%23' + searchParams.q;
	}
	// Build geolocation param if needed
	// TODO - allow custom radius 
	if (searchParams.hasOwnProperty('lat')) {
		queryParams += '&geocode=' + searchParams.lat + '%2C' + searchParams.lng + '%2C15km';
	}
	
	// An object of options to indicate where to post to
	var get_options = {
		host : 'api.twitter.com',
		path : '/1.1/search/tweets.json?' + queryParams
				+ '&result_type=recent&count=10',
		port : '443',
		method : 'GET',
		headers : {
			'Authorization' : 'Bearer ' + accessToken
		}
	};

	// Set up the request
	var get_req = https.get(get_options, function(res) {
		
		res.on('data', function(chunk) {
			tweets += chunk;
		});
		
		res.on('end',				
				function() {
					callback(responseBuilder
							.getResponseJSONFromTwitterResponse(tweets));
				})
	});
}

module.exports.getTweets = getTweets;