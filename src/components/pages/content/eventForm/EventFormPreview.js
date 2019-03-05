import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as routes from '../../../../constants/routes';
import { withRouter } from 'react-router-dom';
import EventCardLarge from '../../../cards/eventCard/EventCardLarge'
import Button from '@material-ui/core/Button';
import './EventForm.css';

function mapStateToProps (state) {
    return {
        image: state.eventFormState.imageURL,
        imageURL: state.eventFormState.imageURL,
        name: state.eventFormState.eventName,
        venue: state.eventFormState.venue,
        date: state.eventFormState.date,
        price: state.eventFormState.price,
        startTime: state.eventFormState.startTime,
        blurb: state.eventFormState.blurb,
        tags: state.eventFormState.selectedTags
    };
}

function mapDispatchToProps (dispatch) {
    return {
        imageUpdated: (imageDetails) => {
            const action = {type: "EVENT_FORM_IMAGE_UPDATED", imageDetails};
            dispatch(action);
        }
    };
}

class EventFormPreview extends Component {
    next () {

    }
    render() { 
        return (
            <div className='eventFormRoot' onSubmit={this.handleFormSubmit}>
                <h1>Looks good?</h1>
                <div className="mainContent">
                    <EventCardLarge {...this.props}></EventCardLarge>
                </div>
                <Button onClick={this.next} className="navButton">Lets go!</Button>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventFormPreview));
