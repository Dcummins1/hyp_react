import React from 'react'
//TODO: google-map-react very limited. will probably have to move to https://tomchentw.github.io/react-google-maps/#googlemap at some point
import GoogleMapReact from 'google-map-react'
import "./Map.css"
import MapPinBasic from "./pins/MapPinBasic"
import { maps } from "../../config"

	export function Map (props) {
		let centerLat = 0;
		let centerLng = 0;
		if (props.selected && props.pins && props.pins[props.selected]) {
			centerLat = props.pins[props.selected].coordinate.latitude;
			centerLng = props.pins[props.selected].coordinate.longitude;
		} else if (props.pins && props.pins[0]) {
			centerLat = props.pins[0].coordinate.latitude;
			centerLng = props.pins[0].coordinate.longitude
        }
        let pins = props.pins;
        pins = pins || [];
		return (
			<div className="map">
				<GoogleMapReact
					bootstrapURLKeys={{key: maps.apiKey}}
					defaultZoom={ 13 }
					center={{lat: centerLat, lng: centerLng}}>
                    {props.children}
                    {pins.map(({lat, coordinate, key, emphasis}, index) =>
						(<MapPinBasic
							key={index}
							pinId={ index }
							emphasis={ index === props.selected }
							lat={ coordinate.latitude }
							lng={ coordinate.longitude }
							interactionHandler={props.selectionCallback}/>))}
				</GoogleMapReact>
			</div>
		)
	}

export default Map;