import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import EventCard from '../cards/eventCard/EventCard';
import "./CircularSwipeableViews.css";

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

export class CircularSwipableViews extends Component {
  constructor(props) {
    super(props);
    this.slideRenderer = this.slideRenderer.bind(this);
  }

  slideRenderer (params) {
    const { index, key } = params;
    const step = this.props.items[mod(index, this.props.items.length)];
    return (
      <div className={this.props.index === index? "eventSelected" : "eventUnselected"} key={key}>
        <EventCard {...step}/>
      </div>);
      
  }

  render() {
    return <VirtualizeSwipeableViews 
      axis={'x'}
      index={this.props.index}
      onChangeIndex={this.props.onChangeIndex} 
      slideRenderer={this.slideRenderer}
      enableMouseEvents>
      
      </VirtualizeSwipeableViews>;
  }
  
}

export default CircularSwipableViews;
