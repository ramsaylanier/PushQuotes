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
	},
	'modifyFavorite': function(deckId, isBeingFavorited){

		if (!this.userId)
			throw new Meteor.Error(422, 'Please log in.')

		if(!Meteor.users.findOne(this.userId).favorites){
			Meteor.users.update({_id: this.userId}, {$set: {"favorites": ["a"]}})
		}

		if(isBeingFavorited)
			Meteor.users.update({_id: this.userId}, {$push: {"favorites": deckId}})
		else
			Meteor.users.update({_id: this.userId}, {$pull: {"favorites": deckId}})

		return deckId
	}
})