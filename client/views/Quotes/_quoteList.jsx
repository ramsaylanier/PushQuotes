QuoteList = ReactMeteor.createClass({
	getMeteorState: function(){
		return {
			quotes: Quotes.find({}, {sort: {order: 1}}).fetch(),
			deck: Decks.findOne()
		}
	},
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
		var quotes = this.state.quotes;
		var deck = this.state.deck;
		var isAuthor;
		var isLive = this.props.isLive;
		var withSlides = this.state.deck.withSlides || false;
		
		if (Meteor.user())
			isAuthor = Router.current().params.username === Meteor.user().username;
		else 
			isAuthor = false;

		return (
			<div>
				{isLive && isAuthor &&
					<div className="live-controls">
						<div className="wrapper">
							<PrevQuoteButton deck={deck} />
							<NextQuoteButton deck={deck} />
						</div>
					</div>
				}
				<ul className="quote-list">
					<Headings.h4>{deck.title}</Headings.h4>
					{quotes.map(function(quote){
						return (
							<QuoteItem key={quote._id} {...quote} withSlides={withSlides} isLive={isLive} hashtags={deck.hashtags} />
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