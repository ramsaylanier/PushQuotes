PageSection = React.createClass(Radium.wrap({
	render:function(){
		var styles = {
			base: {
				padding: "2rem 0rem",
				minHeight: "50vh"
			}
		}

		return(
			<section 
				className={"page-section " + this.props.className}
				style={[
					styles.base,
					styles.base.backgroundColor = this.props.bgColor,
					styles.base.opacity = this.props.alpha
				]}
			>
				{this.props.children}
			</section>
		)
	}

}))