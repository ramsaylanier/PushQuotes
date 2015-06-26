Template.profilePage.onCreated(function(){
	var instance = this;

	instance.autorun(function(){
		var subscription = instance.subscribe('userProfile');

		if (subscription.ready()){

			var user = Meteor.user();
			var hasAvatar = false;

			if (user.profile){
				profileFormAttributes.fields[0].value = user.profile.name;
				hasAvatar = (user.profile.avatar ? true: false);
			}

			if (user.emails){
				profileFormAttributes.fields[2].value = user.emails[0].address;
			}

			profileFormAttributes.fields[1].value = user.username;


			React.render(
				<Page animateIn={DefaultPageAnimateIn}>
					<Wrapper type="form-wrapper" centered={true} backgroundColor="white">
						{hasAvatar ? <UserAvatar image={Meteor.user().profile.avatar} /> : null}
						<Form attributes={profileFormAttributes} />
						
					</Wrapper>
				</Page>,
				document.getElementById('main')
			)
		}
	});
})

Template.profilePage.onRendered(function(){
	Session.set('currentPageTitle', 'profile');
});

Template.profilePage.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('main'));
});