import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as routes from '../../../../constants/routes';
import { withRouter } from 'react-router-dom';
import EventCardLarge from '../../../cards/eventCard/EventCardLarge'
import Button from '@material-ui/core/Button';
import './EventForm.css';
import * as db from '../../../../firebase/db'

/**
 * This is kind of a preview for the in-map style event card. 
 * There should probably be a more complete event card where we can make the image a lot bigger
 */

function mapStateToProps (state) {
    return {
        image: state.eventFormState.imageURL,
        imageURL: state.eventFormState.imageURL,
        imageLocation: state.eventFormState.imageLocation,
        name: state.eventFormState.eventName,
        venue: state.eventFormState.venue,
        date: state.eventFormState.date,
        price: state.eventFormState.price,
        startTime: state.eventFormState.startTime,
        blurb: state.eventFormState.blurb,
        tags: state.eventFormState.selectedTags,
        eventLocation: state.eventFormState.location,
        coordinate: state.eventFormState.coordinate
    };
}

function mapDispatchToProps (dispatch) {
    return {
        clearEventState: () => {
            const action = {type: "EVENT_FORM_UNSET"};
            dispatch(action);
        }
    };
}

class EventFormPreview extends Component {
    writeEvent () {
        db.addEvent({
            image: this.props.imageLocation,
            blurb: this.props.blurb,
            dateTime: this.props.startTime,
            name: this.props.name,
            price: parseInt(this.props.price),
            venue: this.props.venue,
            tags: this.props.tags,
            location: this.props.eventLocation,
            coordinate: this.props.coordinate
        });
        this.props.clearEventState();
        this.props.history.push(routes.HOME);
    }
    render() { 
        return (
            <div className='eventFormRoot' onSubmit={this.handleFormSubmit}>
                <h1>Looks good?</h1>
                <div className="mainContent">
                    <EventCardLarge {...this.props}></EventCardLarge>
                </div>
                <Button onClick={this.writeEvent.bind(this)} className="navButton">Lets go!</Button>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventFormPreview));
