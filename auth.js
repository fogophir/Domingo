var KEY_SECRET_BASE64 = "V2R0YjJyUDBpMkVtbGpQRXc3MEN4a2QyRzpPb01uNUJNcWFaR3VrQjgwc01pNE9iUFp6QXFJQTVmZkhTRXVUclZRaHVlQ3pHTEloSw==";
var https = require('https');
var authKey = '';

function getAuthKey(callback){
	var twitterAuthResponse = '';
	// Post body
	var post_data = "grant_type=client_credentials";

	// An object of options to indicate where to post to
	var post_options = {
	    host: 'api.twitter.com',
	    path: '/oauth2/token',
	    port: '443',
	    method: 'POST',
	    headers: {
	        'Authorization' : 'Basic ' + KEY_SECRET_BASE64,
	        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	        'Content-Length': post_data.length
	    }
	};
	
	// Set up the request
	var post_req = https.request(post_options, function(res) {		  
	    res.setEncoding('utf8');
	    res.on('data', function (chunk) {
	    	twitterAuthResponse += chunk;
	    });
	    
	    // After we have the answer with twitter token
	    res.on('end', function(){
	    	authKey = JSON.parse(twitterAuthResponse)['access_token'];
	    	module.exports.authKey = authKey;
	    	callback();
	    })
	});
	
	// post the data
	post_req.write(post_data);
	post_req.end();
}

module.exports.getAuthKey = getAuthKey;