DashboardPage = React.createClass({
	componentDidMount: function(){
		var page = $('.page');
		var animation = this.props.animation || DefaultPageAnimateIn;
		AnimateItem(page, animation);
	},
	render(){
		return (
			<Page>
				<PageContent>
					<DeckList showAuthor={false}/>
				</PageContent>
			</Page>
		)
	}
});

EditUserProfile = React.createClass({
	componentDidMount(){
		var container = $('.edit-profile-container');
		var form = this.getDOMNode();
		formHeight = $(form).outerHeight();

		SlideShowContent(container, formHeight);
	},
	render(){
		return (
			<Form attributes={profileFormAttributes} />
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
	renderEditProfile(){
		profileFormAttributes.fields[0].value = Meteor.user().username;
		profileFormAttributes.fields[1].value = Meteor.user().emails[0].address;

		React.render(
			<EditUserProfile/>,
			$('.edit-profile-container').get(0)
		)
	},
	render(){
		var username = FlowRouter.getParam('username');

		if (this.data.loading){
			return (
				<div>
					<p>Loading</p>
				</div>
			)
		} else {
			return(
				<div className="user-dashboard p-2">
					<UserAvatar image={this.data.avatar}/>
					<div className="flex-container column centered items-centered">
						<h5 className="user-name uppercase m-b-1">{username}</h5>
						<button className="btn primary-btn" onClick={this.renderEditProfile}>Edit Profile</button>
					</div>

					<div className="edit-profile-container slide-down-container"></div>
				</div>
			)
		}
	}
});