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
				<FollowLink author={this.state.authorName}/>
			</h4>
		)
	}
})

FollowLink = ReactMeteor.createClass({
	getMeteorState: function(){
		return {
			author: this.props.author,
			loggedIn: Meteor.user(),
			isFollowed: Meteor.user() && Meteor.user().following && Meteor.user().following.indexOf(this.props.author) > -1
		}
	},
	toggleFollow: function(){
		var author = this.state.author;
		Meteor.call('toggleFollow', author)
	},
	render: function(){
		var instance = this;
		return (
			<a href="#" className="follow-link" onClick={instance.toggleFollow}>
				{instance.state.loggedIn && Meteor.user().username != this.state.author && 
					<small className={"follow-glyph is" + (instance.state.isFollowed ? "" : "Not") + "Following-glyph"}>
						<small>
							{(instance.state.isFollowed ? "Unfollow" : "Follow")}
						</small>
					</small>
				}
			</a>
		)
	}
})