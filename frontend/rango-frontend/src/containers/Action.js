

const Action = () => {
        fetch('http://127.0.0.1:8000/get_profile/')
          .then(response => response.json())
          .then(res => this.setState({ data: res }));  
 
    }


    export default Action;