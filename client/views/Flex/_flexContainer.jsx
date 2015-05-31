FlexContainer = React.createClass(Radium.wrap({
	render: function(){
		var styles = {
			base: {
				display: "flex"
			}
		}

		return(
			<div 
				className={this.props.classNAme}
				style={[
					styles.base,
					styles.base.flexDirection = this.props.flexDirection,
					styles.base.alignItems = this.props.alignItems
				]}
			>
				{this.props.children}
			</div>
		)

	}
}))