Wrapper = React.createClass({
	componentDidMount: function(){
		if (this.props.animateIn){
			var item = this.getDOMNode();

			var transform = {};

			(this.props.centered ? transform = {start: "-35%", end:"-50%"} : transform = {start:20, end: 0});

			$(item).velocity({
				opacity: [1,0],
				translateY: [transform.end, transform.start]
			}, 1000, [300, 20])
		}
	},
	render: function(){
		return(
			<div className="wrapper">
				{this.props.children}
			</div>
		)
	}
});