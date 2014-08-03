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

		// adding to final response
		finalResponse.push(singleResponseObj);
	}

	return finalResponse;
}

function getResponseJSONFromTwitterResponse(strInstagramResponse) {

	// empty array if nothing to return
	var response = [];
	// TODO
	return response;
}

module.exports.joinTwoReponses = joinTwoReponses;
module.exports.getResponseJSONFromInstagramResponse = getResponseJSONFromInstagramResponse;
module.exports.getResponseJSONFromTwitterResponse = getResponseJSONFromTwitterResponse;
