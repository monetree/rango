import React from 'react';
import Header from 'components/Header/Header';

class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            mail_sent: false
        }
      }

      onEmailChange = (event) => {
        this.setState({email:event.target.value})
        console.log(this.state.email)
      }


      onSubmitEmail = () => {
        fetch('http://127.0.0.1:8000/forgot_password/', {
          method: 'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.email
          })
        })
        .then(response => response.json())
        .then(res => {
                if (res["code"] === 200){
                    localStorage.setItem("email_verification_token", res["token"]);
                    if (this.state.mail_sent === false){
                        this.setState({mail_sent: true})
                    }
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
    

    render(){
        return (
                <div>
                <Header />
                    <article className="br3 bg-light-green ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                        <div className="pa2 ph3-ns pb3-ns">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0 tc">Forgot Password</legend>
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
                        </fieldset>
                        <div className="">
                            <input
                                className="br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Submit"
                                onClick={this.onSubmitEmail}
                                />
                        </div>
                        </div>
                    </article>
                    {(() => {
								if (this.state.mail_sent === true) {
								return (
                                    <h1 className="tc f3 light-red">Please check your email to reset password.. </h1>
								)
							}
					})()}
                   
                </div>
        )
    }
}

export default ForgotPassword;
