Wrapper = React.createClass(Radium.wrap({
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

		var styles = {
			base: {
				position: "relative",
				maxWidth: 1000,
				marginLeft: "auto",
				marginRight: "auto"
			},
			form:{
				maxWidth: 400
			},
			centered: {
				position: "relative",
				top: "50vh",
				transform: "translate3d(0, -50%, 0)"
			}
		}

		return(
			<div
				className="wrapper"
				style={[
					styles.base,
					this.props.type == 'form-wrapper' && styles.form,
					this.props.centered && styles.centered
				]}>
				{this.props.children}
			</div>
		)
	}
}));