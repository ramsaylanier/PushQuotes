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
	'modifyDeckFavorite': function(deckId, isBeingFavorited){

		if (!this.userId)
			throw new Meteor.Error(422, 'Please log in.')

		if(Meteor.users.findOne(this.userId).favorites == undefined){
			Meteor.users.update({_id: this.userId}, {$set: {"favorites": {}}})
		}

		var location = "favorites." + deckId;
		var query = {}
		query[location] = []


		if(isBeingFavorited){
			if(Meteor.users.findOne({_id: this.userId}).favorites[deckId] === undefined){
				Meteor.users.update({_id: this.userId}, {
					$set: query
				})
			}
		} else {
			var favorites = Meteor.users.findOne({_id: this.userId}).favorites
			if(favorites && favorites[deckId] && favorites[deckId].length > 0)
				throw new Meteor.Error(412, "Cannot remove a deck as a favorite while it still has favorited quotes!")
			
			Meteor.users.update({_id: this.userId},
				{
					$unset: query
				}
			)

		}

		return {
			deckId: deckId,
			status: isBeingFavorited
		}
	},
	'modifyQuoteFavorite': function(quoteId, deckId, isBeingFavorited){

		if (!this.userId)
			throw new Meteor.Error(422, 'Please log in.')

		if(Meteor.users.findOne(this.userId).favorites == undefined){
			Meteor.users.update({_id: this.userId}, {$set: {"favorites": {}}})
		}

		var user = Meteor.users.findOne(this.userId)

		var location = "favorites." + deckId;
		var setQuery = {}
		setQuery[location] = [quoteId]

		var pushPullQuery = {}
		pushPullQuery[location] = quoteId

		if(isBeingFavorited){
			if(!user.favorites[deckId]){
				Meteor.users.update({_id: this.userId}, {
					$set: setQuery
				})
			} else {

				Meteor.users.update({_id: this.userId}, {
					$push: pushPullQuery
				})
			}
		} else {
			

			Meteor.users.update({_id: this.userId},
				{
					$pull: pushPullQuery
				},
				{
					multi:true
				}
			)

		}

		return {
			deckId: deckId,
			quoteId: quoteId,
			status: isBeingFavorited
		}
	},
	toggleFollow: function(author){
		var user = Meteor.users.findOne(this.userId)
		if(!user)
			return false;

		if(user && user.following){
			if(user.following.indexOf(author) > -1)//following the user
				Meteor.users.update({_id: this.userId}, {$pull:
					{
						"following": author
					}
				})
			else
				Meteor.users.update({_id: this.userId}, {$push:
					{
						"following": author
					}
				})
		} else if(user && !user.following) {
			Meteor.users.update({_id: this.userId}, {$set:
				{
					"following": [author]
				}
			})
		}

		return true;


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