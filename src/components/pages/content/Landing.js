import React, { Component } from 'react';
import DiscoveryFormChip from "../../discoveryForm/DiscoveryFormChip"
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="landingBody">
        <h1>What would you like to do?</h1>
          <DiscoveryFormChip />
      </div>
    );
  }
}

export default Landing;