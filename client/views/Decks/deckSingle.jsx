DeckPage = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		var slug = FlowRouter.getParam('slug');
		var authorName = FlowRouter.getParam('username');
		var deckSub = Meteor.subscribe('deckList', {slug: slug}, authorName);
		var quoteSub;

		if (deckSub.ready()){
			quoteSub = Meteor.subscribe('quoteList', {deckId: Decks.findOne()._id});
		}

		return {
			ready: deckSub.ready() && quoteSub.ready(),
			deck: Decks.findOne({slug: slug}),
			quotes: Quotes.find({}, {sort: {order: 1}}).fetch()
		}
	},
	componentDidMount(){
		$(window).on('scroll', function(e){
			var pos = $(window).scrollTop();
			var target = $('.page-content').offset().top;
			var title = $('.app-header .title');
			var active = title.hasClass('active');

			if (pos > target && !active){
				title.addClass('active');
			} else if (pos < target && active){
				title.removeClass('active');
			}
		});
	},
	setTitle(){
		$('.app-header .title').text(this.data.deck.title);
	},
	render(){
		var deck = this.data.deck;
		var quotes = this.data.quotes;

		if (this.data.ready){

			this.setTitle();
			return (
				<Page>
					<PageHero classes="deck-hero" heroImage={deck.image}>
						<h2 className="page-title">{deck.title}</h2>
						<Hashtags hashtags={deck.hashtags}/>
					</PageHero>
					<PageContent>
						<QuoteList deck={deck} quotes={quotes} />
					</PageContent>
				</Page>
			)
		} else {
			return (
				<p></p>
			)
		}
	}
});