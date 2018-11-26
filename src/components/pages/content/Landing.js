import React, { Component } from 'react';
import DiscoveryForm from "../../discoveryForm/DiscoveryForm"
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="landingBody">
        <h1>What would you like to do?</h1>
          <DiscoveryForm />
      </div>
    );
  }
}

export default Landing;