import React from 'react'
import Chip from '@material-ui/core/Chip';
import "./EventCard.css"
import Map from '../../maps/Map'
import AlarmIcon from '@material-ui/icons/Alarm';
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

    function truncate(string){
        if (string.length > 30)
        return string.substring(0,30)+'...';
        else
        return string;
    };
	class EventCardLarge extends React.Component {
        render () {
            return (
                <div className="eventCardRoot eventCardLarge">
                    <div className="MainSegment">
                        <div className="eventDetails">
                            <div className="eventLabel" title={this.props.name}>{truncate(this.props.name)}</div>
                            {this.props.venue? <div className="eventDetail"><PlaceIcon style={{fontSize: 14, paddingRight: "5px"}}/>{this.props.venue}</div> : ""}
                            {this.props.date? <div className="eventDetail"><CalendarTodayIcon style={{fontSize: 14, paddingRight: "5px"}}/>{this.props.date}</div> : ""}
                            {this.props.startTime? <div className="eventDetail"><AlarmIcon style={{fontSize: 14, paddingRight: "5px"}}/>{this.props.startTime}</div> : ""}
                            {this.props.price !== "" ? <div className="eventDetail">€{Number(this.props.price).toFixed(2)}</div> : ""}
                        </div>
                        <div className="eventImage" style={{backgroundImage: 'url(' + this.props.imageURL + ')'}}>
                        </div>
                        
                    </div>
                    <div className="blurb eventDetail">{this.props.blurb}</div>
                    <div>
                        <Map className="eventCardMap"></Map>
                    </div>
                    <div className="tags">
                        {
                            this.props.tags.map((data, index) => {
                                let color = "default";
                                if (index < 5) {
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
                                } else if (index === 5 && this.props.tags.length > 5) {
                                    var message = "+" + (this.props.tags.length - 5);
                                    return (
                                        <Chip
                                        {...{color}}
                                        className="tagChip"
                                        key="overflow"
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
	}

export default EventCardLarge;