Modal = React.createClass({
	scrollTop: 0,
	getWindowScrollTop: function(){
		this.scrollTop = $(window).scrollTop();	
		return this.scrollTop
	},
	componentWillMount: function(){
		$('body').css({
			top: -this.getWindowScrollTop()
		});
	},
	componentDidMount: function(){
		var modal = $('.modal');

		TweenMax.to(modal, .4, {
			y: 0,
			ease: Power2.easeOut
		});

		$('body').addClass('modal-active');
	},
	closeModal: function(){
		var self = this;
		var modal = $('.modal');

		TweenMax.to(modal, .4, {
			y: "100%",
			ease: Power2.easeOut
		});

		Meteor.setTimeout(function(){
			React.unmountComponentAtNode(modal.get(0));
			modal.remove();
			$('body').removeClass('modal-active');
			$('body').css({
				top: 0
			});
			$(window).scrollTop(self.scrollTop);
		}, 500);
	},
	render: function(){
		return (
			<div className="modal-content">
				<Toggle className="close-modal-btn btn" onClick={this.closeModal}/>
				{this.props.children}
			</div>
		)
	}
})