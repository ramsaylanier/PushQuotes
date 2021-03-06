Meteor.publish('deckList', function(query, deckAuthorName){
	var user = Meteor.users.findOne({username: deckAuthorName})._id;	
	return Decks.find(query);
})

Meteor.publish('quoteList', function(query){

	// var deckId = Decks.findOne(query)._id;
	return Quotes.find(query, {sort: {order: 1}});
})

Meteor.publish('searchResults', function(query, settings){

	//settings is a string in the form, (authorName)(hashtags)(title)
	var keys = ["authorName", "hashtags", "title"]
	
	if(settings.length == 0)
		settings = keys
	
	var regex = "";
	var splitQuery = query.split(/[^A-Za-z0-9]/);//split on all non-alphanumeric
	
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

	var orArray = settings.map(function(e, i){
		if(keys.indexOf(e) == -1)
			return
		var retJSON = {}
		retJSON[e] = regexQuery
		return retJSON
	})


	return Decks.find({
		
		$or: orArray,
		isPrivate: false

	})

})


Meteor.publish('hashtag', function(hashtag){

	return Decks.find({
		hashtags: hashtag,
		isPrivate: false
	})

})


Meteor.publish('deckSingle', function(params){
	return Decks.find({_id: params.deckId});
})

Meteor.publish('userProfile', function(){
	if(!this.userId)
		return this.ready()
	return Meteor.users.find(this.userId);
})

Meteor.publish('favorites', function(){
	var user = Meteor.users.findOne({_id: this.userId})
	if(!user)
		this.ready()
	var favoriteDeckIds = Object.keys(user.favorites)

	var favoriteQuoteIds = _.reduce(user.favorites, function(quoteIds, quoteArray){
		return quoteIds.concat(quoteArray)
	}, [])

	return [Decks.find({_id:{$in: favoriteDeckIds}}), Quotes.find({_id:{$in: favoriteQuoteIds}})]
})