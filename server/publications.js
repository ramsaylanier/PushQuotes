Meteor.publish('deckList', function(query, deckAuthorName){
	var authorId = Meteor.users.findOne({username: deckAuthorName})._id;

	if (authorId !== this.userId){
		query.isPrivate = false;
	}

	return Decks.find(query);
})

Meteor.publish('quoteList', function(query, liveQuery){

	// if (!query){
	// 	this.ready();
	// 	return false;
	// }

	var deckId = Decks.findOne(query)._id;
	// var limit = limit || 0;
	// return Quotes.find({deckId: deckId}, {limit: limit});
	if (liveQuery){
		return Quotes.find({deckId: deckId, active: true}, {sort: {order: 1}});
	} else{
		return Quotes.find({deckId: deckId}, {sort: {order: 1}});
	}
})

Meteor.publish('deckSingle', function(params){
	return Decks.find({_id: params.deckId});
})