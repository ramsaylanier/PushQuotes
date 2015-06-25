QuoteActions = React.createClass({
	generateTwitterLink: function(){
		var quote = encodeURIComponent(this.props.quote);
		var hashtags = this.props.hashtags;
		var tweetString = "https://twitter.com/intent/tweet?text=" + quote + "&hashtags=" + hashtags;
		return tweetString;
	},
	render: function(){
		return (
			<Link type="tweet" block={true} href={this.generateTwitterLink()} quoteId={this.props.quoteId}>Tweet</Link>
		)
	}
})