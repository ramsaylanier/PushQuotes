QuoteList = React.createClass({
	componentWillMount: function(){
		Session.set('quoteCount', 1);
	},
	componentDidUpdate: function(prevProps, prevState){
		if ($('.live-page').length && $('.quote-item').length){
			var offset = $('.quote-item').last().offset().top - 150;
			$('body').velocity('stop');
			$('body').velocity('scroll', {offset: offset, mobileHA: false });
		}
	},
	render: function(){
		var quotes = this.props.quotes;
		var deck = this.props.deck;
		var hasPlayed = this.props.deck.hasPlayed;
		var isAuthor;
		var isLive = this.props.isLive;
		var withSlides = this.props.deck.withSlides || false;
		var isFavoritesResults = this.props.deckId != undefined

		if (Meteor.user())
			isAuthor = FlowRouter.getParam('username') === Meteor.user().username;
		else 
			isAuthor = false;

		return (
			<div>
				<ul className={"quote-list" + (this.props.favorites ? " favorite-quote-list" : "") + (isLive ? " live-quote-list": "")}>
					{!quotes.length && <p>Add a quote!</p>}
					{quotes.map(function(quote){
						return (
							<QuoteItem key={quote._id} {...quote} withSlides={withSlides} isLive={isLive} hashtags={deck.hashtags} hasPlayed={hasPlayed}/>
						)
					})}
				</ul>
			</div>
		)
	}
});

NextQuoteButton = React.createClass({
	nextQuote: function(){
		Meteor.call('renderNextQuote', this.props.deck, function(error, result){
			if (error){
				alert(error)
			} else {
				Session.set('quoteCount', 1)
			}
		})
	},
	render: function(){
		return (
			<button className="next-quote-btn btn item" onClick={this.nextQuote}>Next</button>
		)
	}
})

PrevQuoteButton = React.createClass({
	prevQuote: function(){
		Meteor.call('renderPreviousQuote', this.props.deck, function(error, result){
			if (error){
				alert(error)
			} else {
				Session.set('quoteCount', 1)
			}
		})
	},
	render: function(){
		return (
			<button className="prev-quote-btn btn item" onClick={this.prevQuote}>Previous</button>
		)
	}
})