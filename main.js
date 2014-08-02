var auth = require('./auth.js');
var twitter = require('./twitter.js');
var http = require('http');
var url = require("url");
var querystring = require('querystring');
var instagram = require('./instagram.js');

function createServer(){
	http.createServer(function(req,res){
		var pathname = url.parse(req.url).pathname;
		res.writeHead(200, {'Content-Type': 'text/html' });
		
		switch (pathname.toLowerCase())
		{
			case '/':
				res.write('<html><head></head><body>');
				res.write('<p>twitter access key is - ' + auth.authKey + '</p>')
				res.end('</body></html>');
				break;
			case '/getTweets':
				var query = url.parse(req.url).query;
				if (query != null)
					var tag = query.substr(4);
			    console.log('Request for ' + pathname + ' received.');
			    console.log('query for path is - ' + query);
			    
				twitter.getTweets(auth.authKey, tag, function(tweets){
					res.writeHead(200, {'Content-Type': 'application/json',
										'Access-Control-Allow-Origin': '*' });
				    res.write(tweets + '');
				    res.end();
				});
				break;
				
			case '/inst':
				var query = url.parse(req.url).query;
				var jsonQueryString = querystring.parse(query);
				
				var searchTerm = jsonQueryString.q;
				
			    console.log('Request for ' + pathname + ' received.');
			    console.log('query for path is - ' + query);
			    
			    instagram.getPosts(searchTerm, function(result){
					res.writeHead(200, {'Content-Type': 'application/json',
										'Access-Control-Allow-Origin': '*' });
				    res.write(result + '');
				    res.end();
				});
				break;
			case '/searchhash':
				// need to handle both instagram and twitter, and convert them into one joint JSON to return
			default: 
				res.writeHead(401, {'Content-Type': 'text/plain'});
			    res.end('unknow path');
		}
	}).listen(1337);
	console.log('listening on port 1337');
}

auth.getAuthKey(createServer);