MainLayout = React.createClass({
	render(){
		console.log('main layout render');
		return (
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"></meta>
				<meta name="fragment" content="!"></meta>

				<title>Push Quotes</title>
				
				<div className="application">

					<Header className="app-header"/>

					<main>
						{this.props.content}
					</main>
				</div>
			</head>
		)
	}
});