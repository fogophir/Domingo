var responseBuilder = require('./responsebuilder.js');

var https = require('https');

function getTweets(accessToken, searchString, callback) {
	var tweets = '';
	// An object of options to indicate where to post to
	var get_options = {
		host : 'api.twitter.com',
		path : '/1.1/search/tweets.json?q=%23' + searchString
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