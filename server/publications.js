Meteor.publish('deckList', function(query, deckAuthorName){
	var authorId = Meteor.users.findOne({username: deckAuthorName})._id;

	if (authorId !== this.userId){
		query.isPrivate = false;
	}

	return Decks.find(query);
})

Meteor.publish('quoteList', function(query, limit){
	var deckId = Decks.findOne(query)._id;
	return Quotes.find({deckId: deckId}, {limit: limit});
})

Meteor.publish('deckSingle', function(params){
	return Decks.find({_id: params.deckId});
})