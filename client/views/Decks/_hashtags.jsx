Hashtags = React.createClass({
	render: function(){
		return (
			<div className="hashtags m-b-2">
				{this.props.hashtags.map((hashtag) => {
					return(
						<Link key={hashtag} className="hashtag" href={"/hashtag/" + hashtag}>#{hashtag}</Link>
					)
				})}
			</div>
		)
	}
});