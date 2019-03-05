import React, { Component } from 'react';
import CircularSwipableViews from './CircularSwipableViews';
import "./Carousel.css"

/**
 * TODO: think we can remove this class
 */

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
      this.myRef.current.firstElementChild.style.maxWidth = "80%";
      this.myRef.current.firstElementChild.style.marginLeft = "10%";
      this.myRef.current.firstElementChild.style["overflow-x"] = "";
    }
    
  }

  render() {
    if (this.props.items.length >= 1) {
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
    return (<div className="carouselRoot">No results found. Please try with different search criteria.</div>);
    
  }
}

export default Carousel;
