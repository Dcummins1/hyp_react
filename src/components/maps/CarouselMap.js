import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Map } from './Map'
import { Carousel } from '../carousel/Carousel'
import "./CarouselMap.css"

function mapStateToProps (state) {
	return {
		items: state.searchState.results,
		selected: state.searchState.focusedResult
	}
}
function mapDispatchToProps (dispatch) {
	return {
		onEventSelection: (e, index) => {
			const action = {type: "PROCESS_EVENT_SELECTION", index};
			dispatch(action);
		}
	}
}
	export class CarouselMap extends Component {
		render() {
			return (
				<div className="carouselMap">
					<div className="mapDiv">
						<Map 
							pins={ this.props.items }
							selected={ this.props.selected }
							selectionCallback= { this.props.onEventSelection }>
						</Map>
					</div>
					<Carousel
						items={this.props.items}
						selectionCallback= { this.props.onEventSelection }
						selected= { this.props.selected }>
					</Carousel>
				</div>);
		}
	}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselMap);
