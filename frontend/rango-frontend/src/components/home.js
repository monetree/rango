import React from 'react';


class Home extends React.Component {	

	componentDidMount() {
		if (!sessionStorage.getItem("token")){
			window.location = "/signin";
		} 
	}


    render() {
        return (
            <div>
                <img src="https://img.wallpapersafari.com/desktop/1920/1080/62/23/EBI9l8.jpg" className="" alt="home page" />
            </div>
        )
    }
}

export default Home;