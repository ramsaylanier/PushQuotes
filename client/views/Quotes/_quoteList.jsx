QuoteList = React.createClass({

	propTypes: {
		quotes: React.PropTypes.array.isRequired,
		deck: React.PropTypes.object.isRequired
	},

	componentWillMount(){
		Session.set('quoteCount', 1);
	},

	componentDidUpdate(prevProps, prevState){
		if ($('.live-page').length && $('.quote-item').length){
			let offset = $('.quote-item').last().offset().top - 150;
			$('body').velocity('stop');
			$('body').velocity('scroll', {offset: offset, mobileHA: false });
		}
	},

	render(){
		let quotes = this.props.quotes;
		let deck = this.props.deck;
		let withSlides = this.props.deck.withSlides;
		let isAuthor = Meteor.userId() === deck.author;

		return (
			<ul className={"quote-list" + (this.props.isLive ? " live-quote-list live-list" : '') + ' list'}>
				{!quotes.length && <p>Add a quote!</p>}
				{quotes.map((quote) => {
					return (
						<QuoteItem key={quote._id} isAuthor={isAuthor} withSlides={withSlides} {...quote} deck={deck}/>
					)
				})}
			</ul>
		)
	}
});
