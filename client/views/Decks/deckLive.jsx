DeckLive = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		let slug = FlowRouter.getParam('slug');
		let authorName = FlowRouter.getParam('username');
		let deckSub = Meteor.subscribe('deckList', {slug: slug}, authorName);
		let quoteSub, deck;

		if (deckSub.ready()){
			deck = Decks.findOne({slug: slug});
			deckId = deck ? deck._id : null;
			quoteSub = Meteor.subscribe('quoteList', {deckId: deckId, pushed: true});
		}

		return {
			ready: deckSub.ready() && quoteSub.ready(),
			deck: deck,
			quotes: Quotes.find({}, {sort: {order: -1}}).fetch()
		}
	},

	componentDidMount(){

		$(window).on('scroll', (e) => {
			let pos = $(window).scrollTop();
			let target = $('.page-content').offset().top;
			let title = $('.app-header .title');
			let active = title.hasClass('active');

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

			let deck = this.data.deck;
			let quotes = this.data.quotes;

			if (!deck){
				return <NotFoundPage/>
			}

			this.setTitle();

			return (
				<div className="page-wrapper">
				<Page className="live-page">
					<PageContent>
						<QuoteCount quotes={quotes}/>
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
	},

	_hashtags(){
		if (this.data.deck.hashtags){
			return <Hashtags hashtags={this.data.deck.hashtags}/>
		}
	}
});
