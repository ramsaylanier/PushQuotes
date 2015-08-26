Template.deckSingle.onRendered(function(){
	Session.set('currentPageTitle', 'deckPage');
})

Template.deckSingle.helpers({
	DeckPage(){
		return DeckPage;
	}
})

DeckPage = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		var slug = Router.current().params.slug;
		var subscription = Meteor.subscribe('deckList', {slug: slug})
		return {
			ready: !subscription.ready(),
			deck: Decks.findOne({slug: slug})
		}
	},
	render: function(){

		var deck = this.data.deck;
		var style = {
			backgroundImage: "url('" + deck.image + "')"
		}

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
	}
});