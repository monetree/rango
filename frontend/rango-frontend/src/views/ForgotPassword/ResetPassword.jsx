import React from 'react';
import Header from 'components/Header/Header';

class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            new_password: '',
            confirm_password: ''
        }
      }

      onNewPasswordChange = (event) => {
        this.setState({new_password:event.target.value})
        console.log(this.state.new_password)
      }
    
      onConfirmPasswordChange = (event) => {
        this.setState({confirm_password:event.target.value})
        console.log(this.state.confirm_password)
      }


      onResetPassword = () => {
        fetch('http://127.0.0.1:8000/reset_password/', {
          method: 'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            token: localStorage.getItem("email_verification_token"),
            new_password: this.state.new_password,
          })
        })
        .then(response => response.json())
        .then(res => {
                if (res["code"] === 200){
                    window.location = "/"
                }else{
                    console.log(res)
                }
            })
        }
    
        componentDidMount() {
            if (localStorage.getItem("token")){
                window.location = "/";
            }
            var url = window.location.search;
            url = url.replace("?token=", '');
            if (url !== localStorage.getItem("email_verification_token")){
                window.location = "/404"
            }
        }
    

    render(){
        return (
            <div>
            <Header />
                <article className="br3 bg-light-green ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                    <div className="pa2 ph3-ns pb3-ns">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0 tc">Reset Password</legend>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">New Password</label>
                        <input
                            className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="new_password"
                            id="new_password"
                            onChange={this.onNewPasswordChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                        <input
                            className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            onChange={this.onConfirmPasswordChange}
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input
                        className="br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Submit"
                        onClick={this.onResetPassword}
                        />
                </div>
                </div>
                </article>
            </div>
        )
    }
}

export default ResetPassword;
