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

	// if (Movies.find().count() < 300){
	// 	var counter = 0;

	// 	while(counter < 300){
	// 		Factory.create('movie', {
	// 			title: Fake.sentence(_.random(1, 5)),
	// 			author: '7AEHBxqXd4ZQ5yGKs',
	// 			authorName: 'VeryBadHello',
	// 			createdOn: randomDate(new Date(2012, 0, 1), new Date()),
	// 			image: 'http://media3.giphy.com/media/yEkeo586C9GDe/giphy.gif',
	// 			published: true,
	// 			synopsis: ':heart::100:'
	// 		});
	// 		counter++;
	// 	}
	// }
})

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}