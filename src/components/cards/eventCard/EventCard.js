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
                {/* <img className="eventImage" src={props.imgPath} alt={props.label} /> */}
                <div className="eventImageOuter">
                    <div className="eventImage" title={props.label} style={{"backgroundImage": "url('" + props.imgPath + "')"}}>
                    </div>
                </div>
                <div className="eventDetails">
                    <div className="eventLabel" title={props.label}>{truncate(props.label)}</div>
                </div>
			</div>
		)
	}

export default EventCard;