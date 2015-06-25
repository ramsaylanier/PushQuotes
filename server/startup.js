Meteor.methods({
	serviceConfig: function(loginStyle){
		ServiceConfiguration.configurations.upsert(
			{ service: "twitter" },
			{
				$set: {
				  consumerKey: Meteor.settings.twitter.public,
				  loginStyle: loginStyle,
				  secret: Meteor.settings.twitter.private
				}
			}
		);

		ServiceConfiguration.configurations.upsert(
			{ service: "facebook" },
				{
				$set: {
				  appId: Meteor.settings.facebook.appId,
				  loginStyle: "popup",
				  secret: Meteor.settings.facebook.appSecret
				}
			}
		);
	}
});

Meteor.startup(function(){
	ServiceConfiguration.configurations.remove();
})

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}