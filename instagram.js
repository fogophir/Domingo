var https = require('https');
var responseBuilder = require('./responsebuilder.js');

function getPosts(searchString, callback) {
	// building the query url
	var urlString = 'https://api.instagram.com/v1/tags/' + searchString
			+ '/media/recent?client_id=c47c672d6bcf44ef887205ed637c0227'

	// fetching via https
	https.get(urlString, function(res) {
		console.log("statusCode: ", res.statusCode);
		console.log("headers: ", res.headers);

    	var instagramPostsJSON = '';
    	
        res.on('data', function(chunk) {
        	instagramPostsJSON += chunk;
        });
        res.on('end', function(){
        	callback(responseBuilder.getResponseJSONFromInstagramResponse(instagramPostsJSON));
        })
	});
}

module.exports.getPosts = getPosts;