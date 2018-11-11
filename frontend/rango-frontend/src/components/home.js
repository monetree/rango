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
                <img src="https://i.pinimg.com/originals/65/2b/50/652b509badc57e4eacf45e00f5dadeb5.jpg" className="" alt="home page" />
            </div>
        )
    }
}

export default Home;
