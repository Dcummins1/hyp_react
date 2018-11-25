import React, { Component } from 'react';
import CircularSwipableViews from './CircularSwipableViews';
import "./Carousel.css"


export class Carousel extends Component {
  constructor(props) {
    super(props);
    this.handleStepChange = this.handleStepChange.bind(this);
    this.myRef = React.createRef();
  }

  handleStepChange(newIndex) {
    const modIndex = ((newIndex % this.props.items.length) + this.props.items.length) % this.props.items.length;
    this.props.selectionCallback(null, modIndex);
  }

  componentDidMount() {
    if (this.myRef.current && this.myRef.current.firstElementChild) {
      this.myRef.current.firstElementChild.style.width = "80%";
      this.myRef.current.firstElementChild.style.marginLeft = "10%";
      this.myRef.current.firstElementChild.style["overflow-x"] = "";
    }
    
  }

  render() {
    return (
      <div className="carouselRoot" ref={this.myRef}>
       <CircularSwipableViews
          index={this.props.selected}
          className="carouselSlider"
          onChangeIndex={this.handleStepChange}
          items={this.props.items}>
       </CircularSwipableViews>
      </div>
    );
  }
}

export default Carousel;
