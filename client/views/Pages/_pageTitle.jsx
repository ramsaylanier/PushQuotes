AuthorName = ReactMeteor.createClass({
	getMeteorState: function(){
		return {authorName: Router.current().params.username};
	},
	componentDidMount: function(){
		var item = this.getDOMNode();
		$(item).velocity({
			opacity: [1, 0],
			translateY: [0, 20]
		}, 300, 'easeOut');
	},
	render: function(){
		var authorName = this.state.authorName;
		return (
			<h4 key={this.state.username} className="page-title item">
				<a href={"/" + this.state.authorName} className="transition-link">{this.state.authorName}</a>
			</h4>
		)
	}
})