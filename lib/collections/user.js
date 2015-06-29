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

if (Meteor.isServer){
	Meteor.methods({
		'resendUserPassword': function(email){
			var userId = Meteor.users.findOne({'emails.address': email})._id;

			if (!userId){
				throw new Meteor.Error(422, 'That email address was not found.')
			}

			Accounts.sendResetPasswordEmail(userId);
		}
	})
}