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
		var withSlides = this.props.deck.withSlides || false;
		var isAuthor;

		if (Meteor.user())
			isAuthor = FlowRouter.getParam('username') === Meteor.user().username;
		else 
			isAuthor = false;

		return (
			<ul className={"quote-list" + (this.props.isLive ? " live-quote-list live-list" : '') + ' list'}>
				{!quotes.length && <p>Add a quote!</p>}
				{quotes.map(function(quote){
					return (
						<QuoteItem key={quote._id} {...quote} deck={deck}/>
					)
				})}
			</ul>
		)
	}
});