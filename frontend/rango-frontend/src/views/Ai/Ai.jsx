import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './Ai.scss';

const particlesOptions = {
  particles: {
      number : {
        value:40,
        density:{
          enable: true,
          value_area: 500
        }
      }
  }
}


class Ai extends Component {

  render() {
    return (
      <div className="body">
        <Particles className=''
          params={particlesOptions}
        />
      </div>
    );
  }
}


export default Ai;
