Template.landingPage.helpers({
	LandingPage(){
		return LandingPage;
	}
})

LandingPage = React.createClass({
	render(){
		return (
			<Page animateIn={DefaultPageAnimateIn}>
				<PageHeader backgroundImage={'/img/home-bg.jpg'} bgAttachment="fixed">
					<PageTitle>Push<span style={{color:Colors.primary}}>Quotes</span></PageTitle>
				</PageHeader>
				
				<PageSection className="first-section" alpha={0} separator={true}>
					<h3 className="section-title white t-a-center">Your quotes delivered directly to your audience in real time.</h3>
					<Link type="primary" align="center">Try It Out!</Link>
				</PageSection>

				<PageSection className="second-section" alpha={1} separator={true}>
					<h4 className="section-title white t-a-center">Create a 'deck' of pre-loaded quotes</h4>
					<p>Your audience will get your pre-loaded quotes pushed directly to their devices at your control. By providing them with pre-loaded content, you can ensure you are being quoted accurately.</p>
				</PageSection>
			</Page>
		)
	}
})

Template.landingPage.onRendered(function(){
	// var animateOut = _.extend(DefaultPageAnimateOut,{options: {duration: 1000, easing:[300, 15],delay: 0}});

	// Session.set('animateOut', animateOut);
	Session.set('currentPageTitle', 'landingPage');

	Meteor.defer(function(){
		var pos = 0,
			pageTitle = $('.page-title');
			pageTitleOffset = pageTitle.offset().top,

		$(window).on('scroll', function(e){
			pos = $(this).scrollTop();
			pageTitle.velocity('stop');
			pageTitle.velocity({
				top: pageTitleOffset - (pageTitle.outerHeight() / 2) + (pos / 2),
				opacity: 1 - (pos / 300)
			}, 1)

		})

		var sectionAnimation = {
			properties: {
				opacity: 1,
				scale: [1, 1.1]
			},
			options: {
				duration: 1000, 
				easing: [.5, .1, .1, 1],
				delay: 300
			}
		}

		AnimateItem($('.first-section'), sectionAnimation);
	})
});