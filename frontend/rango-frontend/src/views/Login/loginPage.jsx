import React from 'react';
import Header from 'components/Header/Header';
import { Link } from "react-router-dom";



class SignIn extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({email:event.target.value})
    console.log(this.state.email)
  }

  onPasswordChange = (event) => {
    this.setState({password:event.target.value})
    console.log(this.state.password)
  }


	onSubmitSignIn = () => {
    fetch('http://127.0.0.1:8000/login/', {
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(res => {
			if (res["code"] === 200){
				localStorage.setItem("token", res["token"]);
				window.location = "/";
			}else{
				console.log(res)
			}
    })
	}

	componentDidMount() {
		if (localStorage.getItem("token")){
			window.location = "/";
		}
	}

  render() {
    return (
			<div>
      <Header />
				<article className="br3 bg-light-green ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
					<div className="pa2 ph3-ns pb3-ns">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f4 fw6 ph0 mh0 tc">Sign In</legend>
					<div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
						<input
							className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
							type="email"
							name="email"
							id="email"
							onChange={this.onEmailChange}
						/>
					</div>
					<div className="mv3">
						<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
						<input
							className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
							type="password"
							name="password"
							id="password"
							onChange={this.onPasswordChange}
						/>
					</div>
					<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
				</fieldset>
				<div className="">
					<input
						className="br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
						type="submit"
						value="Sign in"
						onClick={this.onSubmitSignIn}
						/>
				</div>
				<div className="lh-copy mt3">
				<Link to={"/forgot-password"}>
					<p className="f6 link dim black db">Forgot your password?</p>
				</Link>
				</div>
				</div>
				</article>
			</div>
    )
	}
}


export default SignIn;
