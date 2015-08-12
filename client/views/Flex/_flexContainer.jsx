FlexContainer = React.createClass({
	render: function(){
		var styles = {
			base: {
				display: "flex"
			}
		}

		return(
			<div className={this.props.classNAme}>
				{this.props.children}
			</div>
		)

	}
});