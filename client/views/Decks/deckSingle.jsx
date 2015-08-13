Template.deckSingle.helpers({
	DeckPage(){
		return DeckPage;
	}
})

DeckPage = React.createClass({
	render: function(){
		return (
			<div className="wrapper">
				<DeckList />
				<QuoteList />
			</div>
		)
	}
})