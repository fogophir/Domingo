var CONSUMER_KEY = "Wdtb2rP0i2EmljPEw70Cxkd2G";
var CONSUMER_SECRET = "OoMn5BMqaZGukB80sMi4ObPZzAqIA5ffHSEuTrVQhueCzGLIhK";

var https = require('https');

function getTweets(accessToken, searchString, callback) {
	var tweets ='';
    // An object of options to indicate where to post to
    var get_options = {
        host: 'api.twitter.com',
        path: '/1.1/search/tweets.json?q=' + searchString + '&result_type=recent&count=10&locale=il',
        port: '443',
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        }
    };

    // Set up the request
    var get_req = https.get(get_options , function(res) {
        res.on('data', function(chunk) {
        	tweets += chunk;
        });
        res.on('end', function(){
        	callback(tweets);
        })
    });
}

module.exports.getTweets = getTweets;