import React from 'react'
import Chip from '@material-ui/core/Chip';
import "./EventCard.css"

    function truncate(string){
        if (string.length > 30)
        return string.substring(0,30)+'...';
        else
        return string;
    };
	export function EventCard (props) {
		return (
			<div className="eventCardRoot">
                <div className="MainSegment">
                    <div className="eventDetails">
                        <div className="eventLabel" title={props.label}>{truncate(props.label)}</div>
                        <div className="eventDetail">{props.venue}</div>
                        {typeof props.price === "number" ? <div className="eventDetail">€{props.price.toFixed(2)}</div> : ""}
                    </div>
                    <img className="eventImage" src={props.imgPath} alt={props.label} />
                </div>
                <div className="tags">
                    {
                        props.tags.map((data, index) => {
                            let color = "default";
                            if (index < 2) {
                                if (data.type === 'genre') {
                                    color = "secondary";
                                } else if (data.type === "sponsor") {
                                    color = "primary";
                                }
                                return (
                                    <Chip
                                    {...{color}}
                                    className="tagChip"
                                    key={data.name}
                                    label={data.name}
                                    />
                                );
                            } else if (index === 2 && props.tags.length > 3) {
                                var message = "+" + (props.tags.length - 3);
                                return (
                                    <Chip
                                    {...{color}}
                                    className="tagChip"
                                    key="overfloe"
                                    label={message}
                                    />
                                );
                            }
                            return null;
                        })
                    }
                </div>
			</div>
		)
	}

export default EventCard;