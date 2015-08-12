AuthorName = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
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
		var authorName = this.data.authorName;
		console.log('authorName: ' + authorName);
		return (
			<h4 key={this.data.authorName} className="page-title item">
				<a href={"/" + this.data.authorName} className="transition-link">{this.data.authorName}</a>
				<FollowLink author={this.data.authorName}/>
			</h4>
		)
	}
})

FollowLink = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		return {
			author: this.props.author,
			loggedIn: Meteor.user(),
			isFollowed: Meteor.user() && Meteor.user().following && Meteor.user().following.indexOf(this.props.author) > -1
		}
	},
	toggleFollow: function(){
		var author = this.data.author;
		Meteor.call('toggleFollow', author)
	},
	render: function(){
		var instance = this;
		return (
			<a href="#" className="follow-link" onClick={instance.toggleFollow}>
				{instance.data.loggedIn && Meteor.user().username != instance.data.author && 
					<small className={"follow-glyph is" + (instance.data.isFollowed ? "" : "Not") + "Following-glyph"}>
						<small>
							{(instance.data.isFollowed ? "Unfollow" : "Follow")}
						</small>
					</small>
				}
			</a>
		)
	}
})