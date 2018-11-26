import React from 'react'
import "./EventCard.css"

    function truncate(string){
        if (string.length > 30)
        return string.substring(0,30)+'...';
        else
        return string;
    };
	export function EventCard (props) {
		return (
			<div className="eventCard">
                
                <div className="eventDetails">
                    <div className="eventLabel" title={props.label}>{truncate(props.label)}</div>
                    <div className="eventDetail">{props.venue}</div>
                    {typeof props.price === "number" ? <div className="eventDetail">€{props.price.toFixed(2)}</div> : ""}
                </div>
                <img className="eventImage" src={props.imgPath} alt={props.label} />
			</div>
		)
	}

export default EventCard;