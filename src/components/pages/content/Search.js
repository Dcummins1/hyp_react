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
      venueName: "Workmans Club",
      tags: [
        {name: "Drink Offers"},
        {name: "Late Bar"},
        {name: "Free Early Entry"},
        {name: "Good Drink Offers"},
        {name: "Favourite Tunes"},
        {name: "Karaoke"},
        {name: "Pizza"},
        {name: "Beer Garden"}]
    });
    pins.push({
      lat: 40.727072,
      lng: -74.047710,
      label: 'Eighties Night.',
      imgPath: 'https://picsum.photos/200?noCache=2',
      price: 22,
      venue: "The Grand Social",
      tags: [{name: "80's Music", type: "genre"}]
    });
    pins.push({
      lat: 40.751524,
      lng: -73.982164,
      label: 'Chill Tunes',
      imgPath: 'https://picsum.photos/200?noCache=3',
      price: 0,
      venue: "The Temple Bar",
      tags: [{name: "Tourist Hotspot"}, {name: "Live Music"}]
    });
    pins.push({
      lat: 40.754125,
      lng: -74.041190,
      label: 'Electric Psychadelic Disco Funk Town Soul Train Mayhem; with a long title',
      imgPath: 'https://picsum.photos/200?noCache=4',
      price: 5,
      venue: "The Porterhouse, Temple Bar",
      tags: [{name: "Drink Offers"}, {name: "Craft Beer"}]
    });
    pins.push({
      lat: 40.712760,
      lng: -74.003098,
      label: 'Chill Jazz Night',
      imgPath: 'https://picsum.photos/200?noCache=5',
      price: 8,
      venue: "Wigwam",
      tags: [{name: "Late Bar"}, {name: "Hyp DJ", type: "sponsor"}]
    });
    pins.push({
      lat: 40.713281,
      lng: -73.965005,
      label: 'Battle of the Bands',
      imgPath: 'https://picsum.photos/200?noCache=6',
      venue: 'The Button Factory',
      tags: [{name: "Electronic Music", type: "genre"}, {name: "Late Bar"}, {name: "Limited Tickets"}]
    });
    return (
      <div className="discover">
        <CarouselMap items={ pins }></CarouselMap>
      </div>
    );
  }
}

export default SearchResultsPage;