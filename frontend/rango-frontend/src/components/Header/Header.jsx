import React from 'react';
import { Link } from "react-router-dom";
import VerifyEmailAlert from 'components/Alert/VerifyEmailAlert.jsx';

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
			return (
					<div>
						{(() => {
								if (localStorage.getItem("token") && this.state.verified === false) {
								return (
									<VerifyEmailAlert />
								)
							}
						})()}
  					<header className="tc pv4 pv1-ns bg-near-white">
							<Link to={"/"}>
								<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Home</button>
							</Link>

							{(() => {
									if (localStorage.getItem("token")) {
										this.fetchUser()
										return (
											<div>
												<h1 className="f5 f4-ns fw6 mid-gray">Hello {this.state.user}</h1>
												<Link to={"/admin"}>
													<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Admin</button>
												</Link>
												<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-red shadow-5" onClick={this.logout}>Logout</button>
											</div>
										)
								} else {
									return (
										<div>
											<Link to={"/login-page"}>
												<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Sign In</button>
											</Link>
											<Link to={"/register-page"}>
												<button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Sign Up</button>
											</Link>
										</div>
									)
								}
							})()}
  					</header>
					</div>
			)
		}
}

export default Header;
