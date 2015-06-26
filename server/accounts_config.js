Accounts.config(function(){
	
})

var forbiddenUsernames = [
	"decks",
	"search",
	"login",
	"register",
	"profile"
]


Accounts.validateNewUser(function(user){
	var existingUsername = Meteor.users.findOne({username: user.username}) || forbiddenUsernames.indexOf(user.username) != -1;
	console.log(user)
	if (existingUsername){
		throw new Meteor.Error(403, "Username already exists");
	} else if (user.username < 4){
		throw new Meteor.Error(403, "Username must have at least 4 characters");
	} else{
		return true;
	}
})

Accounts.onCreateUser(function(options, user){
	console.log(options);
	if (options.profile){
		if (user.services.twitter){
			user.username = user.services.twitter.screenName;
			user.profile = options.profile;
			user.profile.avatar = user.services.twitter.profile_image_url;
		} else if (user.services.facebook){
			user.username = user.services.facebook.name;
		}
	}

	console.log(user);
	
	return user;
})