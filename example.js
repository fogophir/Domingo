var CONSUMER_KEY = "Wdtb2rP0i2EmljPEw70Cxkd2G";
var CONSUMER_SECRET = "OoMn5BMqaZGukB80sMi4ObPZzAqIA5ffHSEuTrVQhueCzGLIhK";
var KEY_SECRET_BASE64 = "V2R0YjJyUDBpMkVtbGpQRXc3MEN4a2QyRzpPb01uNUJNcWFaR3VrQjgwc01pNE9iUFp6QXFJQTVmZkhTRXVUclZRaHVlQ3pHTEloSw==";
var http = require('http');
var https = require('https');
var querystring = require('querystring');
//var fs = require('fs');
var url = require("url");

function getTwitterAccessKey(searchString, handleTweets) {
    // Build the post string from an object
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
    	console.log('STATUS: ' + res.statusCode);
    	  console.log('HEADERS: ' + JSON.stringify(res.headers));
    	  
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('getTwitterAccessKeyResponse: ' + chunk);
            getTweets(chunk, searchString, function(tweets){handleTweets(tweets);});
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

function getTweets(accessTokenJSON, searchString, callback) {
	var tweets ='';
    // An object of options to indicate where to post to
    var get_options = {
        host: 'api.twitter.com',
        path: '/1.1/search/tweets.json?q=' + searchString + '&result_type=recent&count=10&locale=il',
        port: '443',
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(accessTokenJSON)['access_token']
        }
    };

    // Set up the request
    var get_req = https.get(get_options , function(res) {
    	console.log('STATUS: ' + res.statusCode);
    	console.log('HEADERS: ' + JSON.stringify(res.headers));
    	  
        res.on('data', function(d) {
//          process.stdout.write(d);
          tweets += d;
        });
        res.on('end', function(){
        	callback(tweets);
        })
    });
}

http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	if (pathname == '/getTweets') {
		var query = url.parse(req.url).query;
		if (query != null)
			var tag = query.substr(4);
	    console.log("Request for " + pathname + " received.");
	    console.log("query for path is - " + query);
	    console.log('tag is - ' + tag);
	    
		getTwitterAccessKey(tag, function(tweets){
			res.writeHead(200, {"Content-Type": "text/plain"});
		    res.write(tweets + '');
		    res.end();
		});
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');