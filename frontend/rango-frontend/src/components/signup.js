import React from 'react';

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  onUsernameChange = (event) => {
    this.setState({username:event.target.value})
    console.log(this.state.username)
  }

  onEmailChange = (event) => {
    this.setState({email:event.target.value})
    console.log(this.state.email)
  }

  onPasswordChange = (event) => {
    this.setState({password:event.target.value})
    console.log(this.state.password)
  }



  onSubmitSignUp = () => {
    fetch('http://127.0.0.1:8000/register/', {
      method: 'post',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
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

  render() {
    return (
			<div>
        <article className="br3 bg-light-green ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
				<div className="pa2 ph3-ns pb3-ns">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f4 fw6 ph0 mh0 tc">Sign In</legend>
          <div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
            <input
              className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              name="username"
              id="username"
              onChange={this.onUsernameChange}
            />
					</div>
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
				</fieldset>
				<div className="">
          <input
            className="br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign up"
            onClick={this.onSubmitSignUp}
          />
				</div>
        </div>
				</article>
			</div>
    )
	}
}


export default SignUp;
