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

		singleResponseObj.User = {};
		if (currentItem.user != null) {
			singleResponseObj.User.Id = currentItem.user.id;
			singleResponseObj.User.UserName = currentItem.user.username;
			singleResponseObj.User.FullName = currentItem.user.full_name;
			singleResponseObj.User.ImageUrl = currentItem.user.profile_picture;
		} else {
			singleResponseObj.User.Id = null;
			singleResponseObj.UserName = null;
			singleResponseObj.FullName = null;
			singleResponseObj.User.ImageUrl = null;
		}

		singleResponseObj.Link = currentItem.link;
		singleResponseObj.CreatedTime = currentItem.created_time; // FORMAT!

		singleResponseObj.Image = {};
		singleResponseObj.Image.Url = currentItem.images.thumbnail.url;
		singleResponseObj.Image.Width = currentItem.images.thumbnail.width;
		singleResponseObj.Image.Height = currentItem.images.thumbnail.height;

		singleResponseObj.CommentsCount = currentItem.comments.count;
		singleResponseObj.LikesCount = currentItem.likes.count;
		singleResponseObj.RetweetCount = null;

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

		singleResponseObj.User = {};
		if (tweet.user != null) {
			singleResponseObj.User.Id = tweet.user.id_str;
			singleResponseObj.User.UserName = tweet.user.screen_name;
			singleResponseObj.User.FullName = tweet.user.name;
			singleResponseObj.User.ImageUrl = tweet.user.profile_image_url;
		} else {
			singleResponseObj.User.Id = null;
			singleResponseObj.UserName = null;
			singleResponseObj.FullName = null;
			singleResponseObj.User.ImageUrl = null;
		}

		singleResponseObj.Link = 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str;
		singleResponseObj.CreatedTime = tweet.created_at; // FORMAT!

		singleResponseObj.Image = {};
		if (tweet.entities.hasOwnProperty('media')) {
			singleResponseObj.Image.Url = tweet.entities.media[0].media_url;
			singleResponseObj.Image.Width = tweet.entities.media[0].sizes.thumb.w;
			singleResponseObj.Image.Height = tweet.entities.media[0].sizes.thumb.h;
		} else {
			singleResponseObj.Image.Url = null;
			singleResponseObj.Image.Width = null;
			singleResponseObj.Image.Height = null;
		}

		singleResponseObj.CommentsCount = null;
		singleResponseObj.LikesCount = tweet.favorite_count;
		singleResponseObj.RetweetCount = tweet.retweet_count;

		// adding to final response
		finalResponse.push(singleResponseObj);
	}
	
	return finalResponse;
}

module.exports.joinTwoReponses = joinTwoReponses;
module.exports.getResponseJSONFromInstagramResponse = getResponseJSONFromInstagramResponse;
module.exports.getResponseJSONFromTwitterResponse = getResponseJSONFromTwitterResponse;
