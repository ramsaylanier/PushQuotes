PageSection = React.createClass(Radium.wrap({
	render:function(){
		var styles = {
			base: {
				padding: "2rem 0rem",
				transformOrigin: "top center",
				backgroundColor: Colors.dark
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
				<Wrapper>
					{this.props.children}
				</Wrapper>
				{this.props.separator && <PageSeparator/>}
			</section>
		)
	}
}))