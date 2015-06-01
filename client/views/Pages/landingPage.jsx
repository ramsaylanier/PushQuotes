Template.landingPage.onRendered(function(){
	// var animateOut = _.extend(DefaultPageAnimateOut,{options: {duration: 1000, easing:[300, 15],delay: 0}});

	// Session.set('animateOut', animateOut);
	Session.set('currentPageTitle', 'landingPage');

	React.render(
		<Page animateIn={DefaultPageAnimateIn}>
			<PageHeader backgroundImage={'/img/home-bg.jpg'} bgAttachment="fixed">
				<PageTitle>Push<span style={{color:Colors.primary}}>Quotes</span></PageTitle>
			</PageHeader>
			<PageSection className="first-section" bgColor="black">
				<Wrapper>
					<Headings.h3 className="section-title" color={Colors.primary} weight={900} alpha={0} align="center">Your quotes delivered directly to your audience in real time.</Headings.h3>
					<Headings.h5 className="section-title" color={Colors.green} weight={900} alpha={0} align="center">Your quotes delivered directly to your audience in real time.</Headings.h5>
				</Wrapper>
			</PageSection>
		</Page>,
		document.getElementById('main')
	)

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
				scale: [1, .9]
			},
			options: {
				duration: 1000, 
				easing: [.5, .1, .1, 1],
				delay: 300
			}
		}

		AnimateItem($('.first-section .section-title'), sectionAnimation);
	})
});

Template.landingPage.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('main'));
});