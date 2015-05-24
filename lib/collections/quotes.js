Quotes = new Mongo.Collection('quotes');

Meteor.methods({
	addQuote: function(deckId, quoteAttributes){
		if (!deckId){
			throw new Meteor.Error(422, 'Your quote must belong to a deck.');
		}

		if (!quoteAttributes.text){
			throw new Meteor.Error(422, 'You must have quote text.')
		}

		var quoteId = Quotes.insert({deckId: deckId, text: quoteAttributes.text});
		Decks.update({_id: deckId}, {$addToSet: {quotes: quoteId}});

		return quoteId;
	},
	editQuote: function(quoteId, deckId, quoteAttributes){
		var deck = Decks.findOne(deckId);

		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		Quotes.update({_id: quoteId}, {$set: {text:quoteAttributes.text}});
	},
	deleteQuote: function(quoteId, deckId){
		var deck = Decks.findOne(deckId);

		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		Quotes.remove({_id: quoteId});
		Decks.update({_id: deckId}, {$pull: {quotes: quoteId}});
	}
})