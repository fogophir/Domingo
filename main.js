var auth = require('./auth.js');
var twitter = require('./twitter.js');
var http = require('http');
var url = require("url");
var querystring = require('querystring');
var instagram = require('./instagram.js');
var sync = require('synchronize');

function createServer() {
	http.createServer(function(req, res) {
		var pathname = url.parse(req.url).pathname;
		res.writeHead(200, {
			'Content-Type' : 'text/html'
		});

		console.log('Request for ' + pathname + ' received.');

		switch (pathname.toLowerCase()) {
		case '/':
			res.write('<html><head></head><body>');
			res.write('<p>twitter access key is - ' + auth.authKey + '</p>')
			res.end('</body></html>');
			break;
		case '/getTweets':

			break;

		case '/inst':

			break;
		case '/searchtag':
			// need to handle both instagram and twitter, and convert them into
			// one joint JSON to return
			searchHashTag(req, res);
			break;
		default:
			res.writeHead(401, {
				'Content-Type' : 'text/plain'
			});
			res.end('unknow path');
		}
	}).listen(1337);
	console.log('listening on port 1337');
}

function searchHashTag(req, res) {

	var query = url.parse(req.url).query;
	var jsonQueryString = querystring.parse(query);

	var searchTerm = jsonQueryString.q;

	// Runs in parallel
	sync.fiber(function() {
		sync.parallel(function() {

			getInstagramInfo(searchTerm, sync.defer());
			getTwitterInfo(searchTerm, sync.defer());
		});

		var results = sync.await();
		// results now contains [{instagram data},{twitter data}] - noth arrays.
		// need to join them into one array
		var finalResults = results[0].concat(results[1]);
		
		// writing response
		res.writeHead(200, {
			'Content-Type' : 'application/json',
			'Access-Control-Allow-Origin' : '*'
		});
		res.write(JSON.stringify(finalResults)+ '');
		res.end();

	});
}

function getInstagramInfo(query, cb) {

	console.log('Instagram: query for path is - ' + query);

	instagram.getPosts(query, function(result) {
		cb(null, result);
	});
}

function getTwitterInfo(query, cb) {

	console.log('Twitter: query for path is - ' + query);

	twitter.getTweets(auth.authKey, query, function(tweets) {

		cb(null, tweets);
	});
}

auth.getAuthKey(createServer);
