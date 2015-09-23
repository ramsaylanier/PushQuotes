DeckPage = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		let slug = FlowRouter.getParam('slug');
		let authorName = FlowRouter.getParam('username');
		let deckSub = Meteor.subscribe('deckList', {slug: slug}, authorName);
		let quoteSub, deck;

		if (deckSub.ready()){
			deck = Decks.findOne({slug: slug});
			deckId = deck ? deck._id : null;

			let query = deck.live ? {deckId: deckId, pushed: false} : {deckId: deckId};

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

	render(){
		if (this.data.ready){

			let deck = this.data.deck;
			let quotes = this.data.quotes;
			let isLive = deck.live;
			let isAuthor = deck.author === Meteor.userId();

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
						{this._deckHashtags()}

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
	},

	_deckHashtags(){
		if (this.data.deck.hashtags){
			return <Hashtags hashtags={this.data.deck.hashtags}/>
		}
	},

	setTitle(){
		$('.app-header .title').text(this.data.deck.title);
	},

	editDeck(){
		Triggers.EditDeck(this.data.deck);
	},


});