import React, { Component } from 'react'
import { Map } from './Map'
import { Carousel } from '../carousel/Carousel'
import "./CarouselMap.css"

	export class CarouselMap extends Component {
		constructor(props) {
			super(props);
			this.state = {
				items: this.props.items,
				selected: this.props.selected || 0
			};
			this.selectionCallback = this.selectionCallback.bind(this);
		}

		selectionCallback(event, itemId) {
			if (event) {
				event.preventDefault();
	  			event.stopPropagation();
			}
			this.setState({
				items: this.state.items,
				selected: itemId
			});
		}

		render() {
			return (
				<div className="carouselMap">
					<div className="mapDiv">
						<Map 
							pins={ this.state.items }
							selected={ this.state.selected }
							selectionCallback= { this.selectionCallback }>
						</Map>
					</div>
					<Carousel
						items={this.state.items}
						selectionCallback= { this.selectionCallback }
						selected= { this.state.selected }>
					</Carousel>
				</div>);
		}
	}

export default CarouselMap;
