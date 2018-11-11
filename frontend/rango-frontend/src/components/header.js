import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Async from 'react-code-splitting'
import Route from 'react-router-dom/Route'; 

//async imports
const SignIn = () => <Async load={import('./signin')} />
const SignUp = () => <Async load={import('./signup')} />

class Header extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<div>
					<header className="tc pv4 pv1-ns bg-near-white">
					<Link to="/" exact={true}>
							<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Home</button>
						</Link>
					<h1 className="f5 f4-ns fw6 mid-gray">Jasper Whitehouse</h1>
						<Link to="/signin" exact={true}>
							<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Sign In</button>
						</Link>
						<Link to="/signup" exact={true}>
							<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Sign Up</button>
						</Link>
						</header>
						<Route path="/signin" component={SignIn}/>
          	<Route path="/signup" component={SignUp}/>
					</div>
				</Router>
			</div>
		)
	}
}

export default Header;