// Template.dashboardPage.onRendered(function(){
	// var instance = this;
	// instance.username = Router.current().params.username;
	
	// instance.component = React.render(
	// 	<div className="wrapper">
	// 		<DeckList/>
	// 	</div>,
	// 	document.getElementById('page')
	// )
	
	// instance.autorun(function(){
	// 	instance.username = Router.current().params.username;
	// 	instance.deckSub = Meteor.subscribe('deckList', {authorName: instance.username}, instance.username);
	// 	instance.deckQuery = {authorName: instance.username};

	// 	if (instance.deckSub.ready()){
	// 		instance.component.data({deck: Decks.find(instance.deckQuery)});
	// 	}
	// });
// });

Template.dashboardPage.helpers({
	ProfilePage: function(){
		return ProfilePage;
	}
})

Template.dashboardPage.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('page'));
});

ProfilePage = React.createClass({
	render(){
		return (
			<div className="page-content">
				<UserProfile/>
				<DeckList showAuthor={false}/>
			</div>
		)
	}
});

UserProfile = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		var avatar = "/images/default.jpg"
		if (Meteor.user())
			avatar = Meteor.user().profile.avatar;
		return {
			loading: !Meteor.user(),
			avatar: avatar
		}
	},
	render(){
		var username = Router.current().params.username;

		if (this.data.loading){
			return (
				<div>
					<p>Loading</p>
				</div>
			)
		} else {
			return(
				<div className="user-profile page-hero flex-container centered t-a-center">
					<UserAvatar image={this.data.avatar}/>
					<div className="flex-container column centered items-centered">
						<h5 className="user-name uppercase m-b-1">{username}</h5>
						<Link href="/profile" className="btn primary-btn">Edit Profile</Link>
					</div>
				</div>
			)
		}
	}
});