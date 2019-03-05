import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as routes from '../../../../constants/routes';
import Button from '@material-ui/core/Button';
import MultiSelectChipsArray from "../../../chips/MultiSelectChipArray";
import { db } from '../../../../firebase'
import './EventForm.css';

function mapStateToProps (state) {
    return {
        tags: state.eventFormState.tags
    };
}

function mapDispatchToProps (dispatch) {
    return {
        onTagSelection: (e, tag) => {
            const action = {type: "EVENT_FORM_TAG_SELECTED", tag: tag};
            dispatch(action);
        },
        initTags: (tags) => {
            const action = {type: "EVENT_FORM_SET_TAGS", tags: tags};
            dispatch(action);
        },
    };
}

class EventFormTags extends Component {
    constructor (props) {
        super(props);
        if (!props.tags || props.tags.length === 0) {
            db.getCollection("tags").then((tagNames) => {
                var tags = [];
                for(let tag in tagNames) {
                    var tagObj = tagNames[tag];
                    tags.push({...tagObj, selected: false, index: tag});
                }
                props.initTags(tags);
            });
        }
        this.next = this.next.bind(this);
    }

    next (e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.history.push(routes.EVENT_FORM_IMAGE);
    }

    // handleFormSubmit (e) {
    //     db.addDocument("events", newEventDetails)
    // }
   
    render() { 
        return (
            <div className='eventFormRoot' onSubmit={this.handleFormSubmit}>
                <h1>Select some tags that describe your event:</h1>
                <div className="mainContent">
                    <MultiSelectChipsArray data={this.props.tags} selectionListener={this.props.onTagSelection} color="secondary"/>
                </div>
                <Button onClick={this.next}>Next</Button>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventFormTags));
