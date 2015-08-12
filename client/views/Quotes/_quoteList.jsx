QuoteList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData: function(){

		if(this.props.deckId)
			return {
				quotes: Quotes.find({deckId: this.props.deckId}, {sort: {order: 1}}).fetch(),
				deck: Decks.findOne({_id: this.props.deckId})
			}


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
		var quotes = this.data.quotes;
		var deck = this.data.deck;
		var hasPlayed = this.data.deck.hasPlayed;
		var isAuthor;
		var isLive = this.props.isLive;
		var withSlides = this.data.deck.withSlides || false;
		var isFavoritesResults = this.props.deckId != undefined

		if (Meteor.user())
			isAuthor = Router.current().params.username === Meteor.user().username;
		else 
			isAuthor = false;

		return (
			<div>
				{isLive && isAuthor && !isFavoritesResults &&
					<div className="live-controls">
						<div className="wrapper">
							<PrevQuoteButton deck={deck} />
							<NextQuoteButton deck={deck} />
						</div>
					</div>
				}
				<ul className={"quote-list" + (this.props.favorites ? " favorite-quote-list" : "") + (isLive ? " live-quote-list": "")}>
					{!isFavoritesResults &&
						<Headings.h4>
							{deck.title}
							{isLive &&
								<span className="float-right">
									<Headings.h5>Quote {quotes.length} / {deck.quotes.length}</Headings.h5>
								</span>
							}
						</Headings.h4>
					}

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