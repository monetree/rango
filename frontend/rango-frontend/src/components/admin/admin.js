import React from 'react';
import './admin.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Async from 'react-code-splitting'
import Route from 'react-router-dom/Route';

const Api = () => <Async load={import('./api')} />
const Ai = () => <Async load={import('./ai')} />


class Admin extends React.Component {
    
    componentDidMount() {
		if (!localStorage.getItem("token")){
			window.location = "/signin";
		}
	}

    render(){
        return (
            <div>
                <Router>
                    <div className="mw9 center ph3-ns">
                    <div className="cf ph2-ns">
                        <div className="fl w-100 w-50-ns pa2">
                            <div className="bg-white pv2">
                                <Link to="/api">
                                    <button className="center-button pointer f2 grow no-underline br1 ph3 pv2 mb2 dib navy bg-light-green shadow-5">Api</button>
                                </Link>
                            </div>
                        </div>
                        <div className="fl w-100 w-50-ns pa2">
                            <div className="bg-white pv1">
                                <Link to="/ai">
                                    <button className="center-button pointer f2 grow no-underline br1 ph3 pv2 mb2 dib navy bg-light-green shadow-5">Ai</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Route path="/api" component={Api} />
                    <Route path="/ai" component={Ai} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default Admin;
