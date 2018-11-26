import React, { Component } from 'react';
import CarouselMap from '../../maps/CarouselMap';
import './Search.css';

class SearchResultsPage extends Component {
  render() {
    let pins = [];
	  pins.push({
		  lat: 40.715623, 
		  lng: -73.992116,
      label: 'Cool Party.',
      imgPath: 'https://picsum.photos/200?noCache=1',
      price: 10.00,
      venueName: "Workmans Club"
    });
    pins.push({
      lat: 40.727072,
      lng: -74.047710,
      label: 'Eighties Night.',
      imgPath: 'https://picsum.photos/200?noCache=2',
      price: 22,
      venue: "The Grand Social"
    });
    pins.push({
      lat: 40.751524,
      lng: -73.982164,
      label: 'Chill Tunes',
      imgPath: 'https://picsum.photos/200?noCache=3',
      price: 0,
      venue: "The Temple Bar"
    });
    pins.push({
      lat: 40.754125,
      lng: -74.041190,
      label: 'Electric Psychadelic Disco Funk Town Soul Train Mayhem; with a long title',
      imgPath: 'https://picsum.photos/200?noCache=4',
      price: 5,
      venue: "The Porterhouse, Temple Bar"
    });
    pins.push({
      lat: 40.712760,
      lng: -74.003098,
      label: 'Chill Jazz Night',
      imgPath: 'https://picsum.photos/200?noCache=5',
      price: 8,
      venue: "Wigwam"
    });
    pins.push({
      lat: 40.713281,
      lng: -73.965005,
      label: 'Battle of the Bands',
      imgPath: 'https://picsum.photos/200?noCache=6',
      venue: 'The Button Factory'
    });
    return (
      <div className="discover">
        <CarouselMap items={ pins }></CarouselMap>
      </div>
    );
  }
}

export default SearchResultsPage;