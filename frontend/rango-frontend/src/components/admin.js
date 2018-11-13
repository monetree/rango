import React from 'react';

class Admin extends React.Component {
    
    componentDidMount() {
		if (!localStorage.getItem("token")){
			window.location = "/signin";
		}
	}

    render(){
        return (
            <div>
                <div className="mw9 center ph3-ns">
                <div className="cf ph2-ns">
                    <div className="fl w-100 w-50-ns pa2">
                        <div className="bg-white pv2">
                            <img src="https://realtimeapi.io/wp-content/uploads/2017/09/realtime-api.png" alt="api" />
                            <button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Home</button>

                        </div>
                    </div>
                    <div className="fl w-100 w-50-ns pa2">
                        <div className="bg-white pv1">
                            <img src="https://cdn.pixabay.com/photo/2018/09/18/11/19/artificial-intelligence-3685928_960_720.png" alt="ai" />
                            <button className="pointer f6 grow no-underline br-pill ph3 pv2 mb2 dib navy bg-light-green shadow-5">Home</button>

                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Admin;

