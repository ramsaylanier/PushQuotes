Meteor.methods({
	'updateUserProfile': function(userProfile, userBase){

		if (!this.userId){
			throw new Meteor.Error(422, 'Please log in.')
		}

		var existingUser = Meteor.users.findOne(this.userId);
		var email = {
			verified:false,
			address:userBase.email
		}

		if (existingUser.emails){
			email.verified = (existingUser.emails[0].verified && existingUser.emails[0].address === userBase.email ? true : false);
		} 

		Meteor.users.update({_id: this.userId}, {$set: {profile: userProfile, username: userBase.username, emails: [email] } } );
	}
})