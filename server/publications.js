Meteor.publish('deckList', function(query, deckAuthorName){
	console.log(deckAuthorName);
	var authorId = Meteor.users.findOne({username: deckAuthorName})._id;

	if (authorId !== this.userId){
		query.isPrivate = false;
	}

	return Decks.find(query);
})

Meteor.publish('quoteList', function(query, liveQuery){

	var deckId = Decks.findOne(query)._id;

	if (liveQuery){
		return Quotes.find({deckId: deckId, active: true}, {sort: {order: 1}});
	} else{
		return Quotes.find({deckId: deckId}, {sort: {order: 1}});
	}
})

Meteor.publish('searchResults', function(query){

		var regex = "";
		var splitQuery = query.split(/[^A-Za-z0-9]/);//split on all non-alphanumeric
		console.log(query)
		console.log(splitQuery)
		for(var i = 0; i < splitQuery.length; i++){
			var phrase = splitQuery[i]
			if(phrase.length == 0)
				continue
			regex += "(?=" + phrase + ").|"
		}

		regex = regex.substr(0, regex.length - 1)


		var regexQuery = {
			$regex: regex,
			$options: 'gi'
		}//add better checking for queries with spaces, maybe split on space and render a bunch of ors


		return Decks.find({
			
			$or: [
				{
					title: regexQuery
				},
				{
					hashtags: regexQuery
				}
			],
			isPrivate: false

		})

})

Meteor.publish('deckSingle', function(params){
	return Decks.find({_id: params.deckId});
})

Meteor.publish('userProfile', function(){
	return Meteor.users.find(this.userId);
})