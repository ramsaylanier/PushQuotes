// CODE FOR VIEWING LIVE PRESENTATION FROM DECK VIEW
// *******
//
// {this.props.live ?
// 	<Section className="deck-section">
// 		<Link color="white" bg="greenBg" size="large" type="button" block={true} href={'/' + this.props.authorName + '/' + this.props.slug + '/live'} className="live-link transition-link">View Presentation</Link>
// 	</Section> :
// 	null 
// }


// <Section className="deck-footer deck-section">
// 	<div className="deck-meta">
// 		<Count count={this.props.quotes.length} name="Quotes" icon={QuoteIcon} />
// 	</div>

// 	<div className="action-list">
// 		{isAuthor && <Actions actions={this.actions()}/>}
// 		{Meteor.userId() && <FavoriteDeck _id={this.props._id}/>}
// 	</div>

// </Section>

Hashtags = React.createClass({
	render: function(){
		return (
			<div className="hashtags m-b-2">
				{this.props.hashtags.map(function(hashtag){
					return(
						<Link className="hashtag" href={"/hashtag/" + hashtag}>#{hashtag}</Link>
					)
				})}
			</div>
		)
	}
});