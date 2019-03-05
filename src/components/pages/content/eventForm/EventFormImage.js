import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as routes from '../../../../constants/routes';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './EventForm.css';
import ImageUpload from '../../../formElements/imageUpload/ImageUpload';

/**
 * image upload, and save to cloud firestore.
 */
function mapStateToProps (state) {
    return {
        imageLocation: state.eventFormState.imageLocation,
        imageURL: state.eventFormState.imageURL
    };
}

function mapDispatchToProps (dispatch) {
    return {
        imageUpdated: (imageDetails) => {
            const action = {type: "EVENT_FORM_IMAGE_UPDATED", imageDetails};
            console.log(imageDetails)
            dispatch(action);
        }
    };
}

class EventFormImage extends Component {
    next () {
        this.props.history.push(routes.EVENT_FORM_PREVIEW);
    }
    render() { 
        return (
            <div className='eventFormRoot' onSubmit={this.handleFormSubmit}>
                <h1>Upload an image for your event.</h1>
                <div className="mainContent">
                    <ImageUpload 
                        imageUpdated={this.props.imageUpdated}
                        imageLocation={this.props.imageLocation}
                        imageURL={this.props.imageURL}
                        folder="eventImages">
                    </ImageUpload>
                </div>
                <Button onClick={this.next.bind(this)} className="navButton">Next</Button>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventFormImage));
