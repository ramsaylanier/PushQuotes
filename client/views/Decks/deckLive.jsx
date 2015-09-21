DeckLive = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		var slug = FlowRouter.getParam('slug');
		var authorName = FlowRouter.getParam('username');
		var deckSub = Meteor.subscribe('deckList', {slug: slug}, authorName);
		var quoteSub, deck;

		if (deckSub.ready()){
			deck = Decks.findOne({slug: slug});
			deckId = deck ? deck._id : null;
			quoteSub = Meteor.subscribe('quoteList', {deckId: deckId, pushed: true});
		}

		return {
			ready: deckSub.ready() && quoteSub.ready(),
			deck: deck,
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
		if (this.data.ready){

			var deck = this.data.deck;
			var quotes = this.data.quotes;

			if (!deck){
				return <NotFoundPage/>
			}

			this.setTitle();
			return (
				<div className="page-wrapper">
				<Page className="live-page">
					<PageHero classes="deck-hero" heroImage={deck.image}>
						<h2 className="page-title">{deck.title}</h2>
						{deck.hashtags && 
						<Hashtags hashtags={deck.hashtags}/>
						}
					</PageHero>
					<PageContent>
						<QuoteList deck={deck} quotes={quotes} />
					</PageContent>
				</Page>
				</div>
			)
		} else {
			return (
				<p></p>
			)
		}
	}
});