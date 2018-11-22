import React from 'react';
import "./MapPinBasic.css";


export default function MapPinBasic (props) {
	return (<div className={"mapPinContainer " + (props.emphasis? "emphasis" : "")}>
		<div className="mapPinBody" onClick={ (e) => props.interactionHandler(e, props.pinId) }></div>
		<div className="mapPinPoint" onClick={ (e) => props.interactionHandler(e, props.pinId) }></div>
	</div>)
}