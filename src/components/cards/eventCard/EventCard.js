import React from 'react'
import Chip from '@material-ui/core/Chip';
import { storage } from '../../../firebase'
import "./EventCard.css"

    function truncate(string){
        if (string.length > 30)
        return string.substring(0,30)+'...';
        else
        return string;
    };
	class EventCard extends React.Component {
        state = {
            imageUrl: ''
        }
        constructor (props) {
            super(props);
            storage.getImageUrl(this.props.image).then((imageUrl) => {
                this.setState({imageUrl});
            });
        }
        render () {
            return (
                <div className="eventCardRoot">
                    <div className="MainSegment">
                        <div className="eventDetails">
                            <div className="eventLabel" title={this.props.name}>{truncate(this.props.name)}</div>
                            <div className="eventDetail">{this.props.venue}</div>
                            {typeof this.props.price === "number" ? <div className="eventDetail">€{this.props.price.toFixed(2)}</div> : ""}
                        </div>
                        <div className="eventImage" style={{backgroundImage: 'url(' + this.state.imageUrl + ')'}}>
                        </div>
                        
                    </div>
                    <div className="tags">
                        {
                            this.props.tags.map((data, index) => {
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
                                } else if (index === 2 && this.props.tags.length > 3) {
                                    var message = "+" + (this.props.tags.length - 3);
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
	}

export default EventCard;