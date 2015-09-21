DeckPage = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		var slug = FlowRouter.getParam('slug');
		var authorName = FlowRouter.getParam('username');
		var deckSub = Meteor.subscribe('deckList', {slug: slug}, authorName);
		var quoteSub, deck;

		if (deckSub.ready()){
			deck = Decks.findOne({slug: slug});
			deckId = deck ? deck._id : null;

			var query = deck.live ? {deckId: deckId, pushed: false} : {deckId: deckId};

			quoteSub = Meteor.subscribe('quoteList', query);
		}

		return {
			ready: deckSub.ready() && quoteSub.ready(),
			deck: deck,
			quotes: Quotes.find({}, {sort: {order: -1}}).fetch()
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
	editDeck(){
		Triggers.EditDeck(this.data.deck);
	},
	render(){
		if (this.data.ready){

			var deck = this.data.deck;
			var quotes = this.data.quotes;
			var isLive = deck.live;
			var isAuthor = deck.author === Meteor.userId();

			if (!deck){
				return <NotFoundPage/>
			} 

			if (isLive && !isAuthor){
				FlowRouter.go(window.location.pathname + '/live')
			}

			this.setTitle();

			return (
				<div className="page-wrapper">
				<Page className={"" + (isLive ? 'live-page' : '')}>
					<PageHero classes="deck-hero" heroImage={deck.image}>
						<h2 className="page-title">{deck.title}</h2>
						{deck.hashtags && 
						<Hashtags hashtags={deck.hashtags}/>
						}

						{!isLive && isAuthor && <ActionToggle action={this.editDeck}/> }
					</PageHero>
					<PageContent>
						<QuoteList deck={deck} isLive={isLive} quotes={quotes} />
					</PageContent>
				</Page>

				{isAuthor && <TriggerLiveToggle deckId={deck._id} live={deck.live}/>}
				{isAuthor && <TriggerModalToggle trigger={Triggers.AddQuote} />}
				</div>
			)
		} else {
			return (
				<p></p>
			)
		}
	}
});