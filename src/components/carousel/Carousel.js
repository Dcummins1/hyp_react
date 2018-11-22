import React, { Component } from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
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
    const maxSteps = this.props.items.length;

    return (
      <div className="carouselRoot" ref={this.myRef}>
       <CircularSwipableViews
          index={this.props.selected}
          className="carouselSlider"
          onChangeIndex={this.handleStepChange}
          items={this.props.items}>
       </CircularSwipableViews>
       <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={ this.props.selected }
          className="CarouselStepper"
          nextButton={
            <Button 
              size="small" 
              onClick={(e) => this.handleStepChange(this.props.selected + 1)}>
              {<KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button 
              size="small"  
              onClick={(e) => this.handleStepChange(this.props.selected - 1)}>
              {<KeyboardArrowLeft />}
            </Button>
          }
        />
      </div>
    );
  }
}

export default Carousel;
