import React, { Component } from 'react';
import CarouselMap from '../../maps/CarouselMap';
import './Landing.css';

class App extends Component {
  render() {
    let pins = [];
	  pins.push({
		  lat: 40.715623, 
		  lng: -73.992116,
      label: 'Cool Party.',
      imgPath: 'https://picsum.photos/500/200?noCache=1'
    });
    pins.push({
      lat: 40.727072,
      lng: -74.047710,
      label: 'Eighties Night.',
      imgPath: 'https://picsum.photos/500/200?noCache=2'
    });
    pins.push({
      lat: 40.751524,
      lng: -73.982164,
      label: 'Chill Tunes',
      imgPath: 'https://picsum.photos/500/200?noCache=3'
    });
    pins.push({
      lat: 40.754125,
      lng: -74.041190,
      label: 'Electric Psychadelic Disco Funk Town Soul Train Mayhem; with a long title',
      imgPath: 'https://picsum.photos/500/200?noCache=4'
    });
    pins.push({
      lat: 40.712760,
      lng: -74.003098,
      label: 'Chill Jazz Night',
      imgPath: 'https://picsum.photos/500/200?noCache=5'
    });
    pins.push({
      lat: 40.713281,
      lng: -73.965005,
      label: 'Battle of the Bands',
        imgPath: 'https://picsum.photos/500/200?noCache=6'
    });
    return (
      <div className="discover">
        <CarouselMap items={ pins }></CarouselMap>
      </div>
    );
  }
}

export default App;