DeckPage = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		var slug = FlowRouter.getParam('slug');
		var authorName = FlowRouter.getParam('username');
		var subscription = Meteor.subscribe('deckList', {slug: slug}, authorName)
		return {
			ready: subscription.ready(),
			deck: Decks.findOne({slug: slug})
		}
	},
	render(){

		var deck = this.data.deck;
		console.log(deck);


		if (this.data.ready){
			return (
				<Page>
					<PageHero classes="deck-hero" heroImage={deck.image}>
						<h2 className="page-title">{deck.title}</h2>
						<Hashtags hashtags={deck.hashtags}/>
					</PageHero>
					<PageContent>
						<QuoteList />
					</PageContent>
				</Page>
			)
		} else {
			return (
				<Page></Page>
			)
		}
	}
});