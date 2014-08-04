function joinTwoReponses(response1, response2) {
	return response1.concat(response2);
}

function getResponseJSONFromInstagramResponse(strInstagramResponse) {

	var jsonInstagramResponse = JSON.parse(strInstagramResponse);

	// empty array
	var finalResponse = [];

	var i;
	for (i = 0; i < jsonInstagramResponse.data.length; i++) {

		var currentItem = jsonInstagramResponse.data[i];

		// creating a single post object
		var singleResponseObj = {};

		singleResponseObj.SocialNetwork = 'instagram';

		singleResponseObj.Type = currentItem.type;
		singleResponseObj.Tags = currentItem.tags;

		if (currentItem.caption != null && currentItem.caption.text != null)
			singleResponseObj.CaptionText = currentItem.caption.text;
		else
			singleResponseObj.CaptionText = null;

		if (currentItem.user != null) {
			singleResponseObj.UserName = currentItem.user.username;
			singleResponseObj.UserFullName = currentItem.user.full_name;
		} else {
			singleResponseObj.User = null;
			singleResponseObj.UserFullName = null;
		}

		singleResponseObj.Link = currentItem.link;
		singleResponseObj.CreatedTime = currentItem.created_time; // FORMAT!

		singleResponseObj.ThumbImage = currentItem.images.thumbnail.url;

		singleResponseObj.CommentsCount = currentItem.comments.count;
		singleResponseObj.LikesCount = currentItem.likes.count;
		singleResponseObj.retweet = null;

		// adding to final response
		finalResponse.push(singleResponseObj);
	}

	return finalResponse;
}

function getResponseJSONFromTwitterResponse(strTwitterResponse) {
	
	// Parse twitter JSONstr to JSON 
	jsonTwitterResponse = JSON.parse(strTwitterResponse);
	
	// empty array if nothing to return
	var finalResponse = [];
	
	// Parse twitter JSON into our response JSON format 
	for (index in jsonTwitterResponse.statuses) {
		
		// Get current tweet to parse
		var tweet = jsonTwitterResponse.statuses[index];
		
		// creating a single post object
		var singleResponseObj = {};

		singleResponseObj.SocialNetwork = 'tweeter';

		singleResponseObj.Type = 'text';
		
		singleResponseObj.Tags = [];
		for (tag in tweet.entities.hashtags)
		{
			singleResponseObj.Tags.push(tweet.entities.hashtags[tag].text);
		}

		singleResponseObj.CaptionText = tweet.text;

		if (tweet.user != null) {
			singleResponseObj.UserName = tweet.user.id_str;
			singleResponseObj.UserFullName = tweet.user.name;
		} else {
			singleResponseObj.User = null;
			singleResponseObj.UserFullName = null;
		}

		singleResponseObj.Link = 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str;
		singleResponseObj.CreatedTime = tweet.created_at; // FORMAT!

		singleResponseObj.ThumbImage = null;

		singleResponseObj.CommentsCount = null;
		singleResponseObj.LikesCount = tweet.favorite_count;
		singleResponseObj.retweet = tweet.retweet_count;

		// adding to final response
		finalResponse.push(singleResponseObj);
	}
	
	return finalResponse;
}

module.exports.joinTwoReponses = joinTwoReponses;
module.exports.getResponseJSONFromInstagramResponse = getResponseJSONFromInstagramResponse;
module.exports.getResponseJSONFromTwitterResponse = getResponseJSONFromTwitterResponse;
