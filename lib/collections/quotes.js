Quotes = new Mongo.Collection('quotes');

Meteor.methods({
	addQuote: function(deckId, quoteAttributes){
		if (!deckId){
			throw new Meteor.Error(422, 'Your quote must belong to a deck.');
		}

		if (!quoteAttributes.text){
			throw new Meteor.Error(422, 'You must have quote text.')
		}

		text = quoteAttributes.text;
		order = quoteAttributes.order || 1;
		slide = quoteAttributes.slide || null;

		var quoteId = Quotes.insert({deckId: deckId, text: text, order: order, slide: slide, tweets: 0});
		Decks.update({_id: deckId}, {$addToSet: {quotes: quoteId}});

		return quoteId;
	},
	editQuote: function(quoteId, deckId, quoteAttributes){
		var deck = Decks.findOne(deckId);

		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		Quotes.update({_id: quoteId}, {$set: {text:quoteAttributes.text, order: quoteAttributes.order, slide:quoteAttributes.slide}});
	},
	deleteQuote: function(quoteId, deckId){
		var deck = Decks.findOne(deckId);

		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		Quotes.remove({_id: quoteId});
		Decks.update({_id: deckId}, {$pull: {quotes: quoteId}});
	},
	incTweets: function(quoteId){// todo - add more security, maybe submit twitter callback info to verify that the quote was tweeted
		
		if(!Quotes.findOne(quoteId).tweets)
			Quotes.update({_id:quoteId},{$set:{tweets:1}})
		else
			Quotes.update({_id:quoteId},{$inc:{tweets:1}})
	}
})