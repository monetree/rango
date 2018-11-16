import React from 'react';
import Header from 'components/Header/Header';
import { Link } from "react-router-dom";

class Admin extends React.Component {

    componentDidMount() {
		if (!localStorage.getItem("token")){
			window.location = "/login-page";
		}
	}

    render(){
        return (
            <div>
            <Header />
              <div className="mw9 center ph3-ns">
              <div className="cf ph2-ns">
                  <div className="fl w-100 w-50-ns pa2">
                      <div className="bg-white pv2">
                        <Link to={"/api"}>
                            <button className="center-button pointer f2 grow no-underline br1 ph3 pv2 mb2 dib navy bg-light-green shadow-5">Api</button>
                        </Link>
                      </div>
                  </div>
                  <div className="fl w-100 w-50-ns pa2">
                      <div className="bg-white pv1">
                        <Link to={"/ai"}>
                            <button className="center-button pointer f2 grow no-underline br1 ph3 pv2 mb2 dib navy bg-light-green shadow-5">Ai</button>
                        </Link>
                      </div>
                  </div>
              </div>
              </div>
            </div>
        )
    }
}

export default Admin;
