Quotes = new Mongo.Collection('quotes');

function verifyQuoteAttributes(quoteAttributes, userId, deckId, quoteId){

	if (!deckId){
		throw new Meteor.Error(422, 'Your quote must belong to a deck.');
	}

	if (!quoteAttributes.text){
		throw new Meteor.Error(422, 'You must have quote text.')
	}

	var deck = Decks.findOne(deckId)
	if(deck.author != userId)
		throw new Meteor.Error(422, "You can't add quotes to a deck you don't own!");

	if(quoteId){
		var quote = Quotes.findOne(quoteId)
		if(quote.deckId != deckId)
			throw new Meteor.Error(422, "This quote doesn't belong to that deck!")
	}

	quoteAttributes.order = (quoteAttributes.order == undefined) ? 1 : quoteAttributes.order
	quoteAttributes.slide = (quoteAttributes.slide == undefined) ? null : quoteAttributes.slide

	return quoteAttributes
}

Meteor.methods({
	addQuote: function(deckId, oldQuoteAttributes){
		

		var quoteAttributes = verifyQuoteAttributes(oldQuoteAttributes, this.userId, deckId)

		text = quoteAttributes.text;
		order = quoteAttributes.order;
		slide = quoteAttributes.slide;

		var quoteId = Quotes.insert({deckId: deckId, text: text, order: order, slide: slide, tweets: 0});
		Decks.update({_id: deckId}, {$addToSet: {quotes: quoteId}});

		return quoteId;
	},
	editQuote: function(quoteId, deckId, oldQuoteAttributes){

		var quoteAttributes = verifyQuoteAttributes(oldQuoteAttributes, this.userId, deckId, quoteId)

		Quotes.update({_id: quoteId}, {$set: {text:quoteAttributes.text, order: quoteAttributes.order, slide:quoteAttributes.slide}});

		return quoteId
	},
	deleteQuote: function(quoteId, deckId){
		var deck = Decks.findOne(deckId);

		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		Quotes.remove({_id: quoteId});
		Decks.update({_id: deckId}, {$pull: {quotes: quoteId}});
	},
	incTweets: function(quoteId){
		
		if(!Quotes.findOne(quoteId).tweets)
			Quotes.update({_id:quoteId},{$set:{tweets:1}})
		else
			Quotes.update({_id:quoteId},{$inc:{tweets:1}})
	}
})