import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Async from 'react-code-splitting'
import Route from 'react-router-dom/Route';

//async imports
const SignIn = () => <Async load={import('./signin')} />
const SignUp = () => <Async load={import('./signup')} />
const Home = () => <Async load={import('./home')} />
const Alert = () => <Async load={import('./alert')} />
const Admin = () => <Async load={import('./admin/admin')} />

class Header extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			user: '',
			verified: false
		}
	}

	verifyUser = () => {
			fetch('http://127.0.0.1:8000/verify_user/', {
				method: 'post',
				headers:{'Content-Type': 'application/json'},
				body: JSON.stringify({
					token: localStorage.getItem("token")
				})
		})
		.then(response => response.json())
		.then(res => {
			if (this.state.verified === false){
				this.setState({verified: true})
			}			
		})
	}

	 fetchUser = () => {
		 fetch('http://127.0.0.1:8000/get_user/', {
				method: 'post',
				headers:{'Content-Type': 'application/json'},
				body: JSON.stringify({
					token: localStorage.getItem("token")
				})
		})
		.then(response => response.json())
		.then(res => {
			if(res.code === 200){
			var url = window.location.search;
			url = url.replace("?token=", '');
			if (url === localStorage.getItem("token")){
				this.verifyUser()
			}
			if (this.state.user === ''){
				this.setState({user:res.user})
				this.setState({verified:res.verified})
			}
			}else{
				localStorage.removeItem("token");
			}
		})
	}

	logout = () => {
			fetch('http://127.0.0.1:8000/logout/', {
				 method: 'post',
				 headers:{'Content-Type': 'application/json'},
				 body: JSON.stringify({
					 token: localStorage.getItem("token")
				 })
		 })
		 .then(response => response.json())
		 .then(res => {
			  if (res["code"] === 200){
				localStorage.removeItem("token");
					window.location = "/";
				}else{
					console.log("failed")
				}
		 })
	}

	render() {
		if (localStorage.getItem("token")){
			this.fetchUser()
			return (
				<div>
					<Router>
						<div>
						<div>
						{(() => {
								if (this.state.verified === false) {
								return (
									<Alert />
								)
							}
						})()}
						</div>
						<header className="tc pv4 pv1-ns bg-near-white">
						<Link to="/">
								<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Home</button>
						</Link>
						<h1 className="f5 f4-ns fw6 mid-gray">Hello {this.state.user}</h1>
						<Link to="/admin">
								<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Admin</button>
						</Link>
						<button
						className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-red shadow-5"
						onClick={this.logout}>Logout</button>
							</header>
							<Route path="/signin" component={SignIn}/>
							<Route path="/signup" component={SignUp}/>
							<Route path="/" exact strict component={Home}/>
							<Route path="/admin" exact strict component={Admin}/>
						</div>
					</Router>
				</div>
			)
		}else{
			return (
				<div>
					<Router>
						<div>
						<header className="tc pv4 pv1-ns bg-near-white">
						<Link to="/">
								<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Home</button>
						</Link>
						<h1 className="f5 f4-ns fw6 mid-gray">Jasper Whitehouse</h1>

							<Link to="/signin">
								<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Sign In</button>
							</Link>
							<Link to="/signup">
								<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Sign Up</button>
							</Link>

							</header>
							<Route path="/signin" component={SignIn}/>
							<Route path="/signup" component={SignUp}/>
							<Route path="/" exact component={Home}/>
						</div>
					</Router>
				</div>
			)
		}

	}
}

export default Header;
