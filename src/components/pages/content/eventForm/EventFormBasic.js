import React, { Component } from 'react';
import * as routes from '../../../../constants/routes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import GooglePlaceAutocomplete from '../../../formElements/placesDropdown/PlacesDropdown'
import './EventForm.css';

function mapStateToProps (state) {
    return {
        apiLoaded: state.mapsState.placesApiLoaded,
        placesSearchText: state.eventFormState.placesSearchText,
        point: state.eventFormState.point,
        eventName: state.eventFormState.eventName,
        venue: state.eventFormState.venue,
        date: state.eventFormState.date,
        price: state.eventFormState.price,
        starttime: state.eventFormState.startTime,
        blurb: state.eventFormState.blurb,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        formUpdate: (property, value) => {
            const action = {type: "EVENT_FORM_UPDATE", property: property, value: value};
            dispatch(action);
        },
        placesSearchStringUpdate: (e) => {
            const action = {type: "EVENT_FORM_PLACE_SEARCH_UPDATE", placesSearchText: e.target.value};
            dispatch(action);
        },
        placeSelected: (location) => {
            const action = {type: "EVENT_FORM_PLACE_SELECTED", location: location};
            dispatch(action);
        }
    };
}

class EventForm extends Component {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    handleChange = name => event => {
        this.props.formUpdate(name, event.target.value);
    };
    handleFormSubmit (e) {
        e.preventDefault();
        e.stopPropagation();
        //TODO: maybe this could be better done as a single page with dynamic content
        this.props.history.push(routes.EVENT_FORM_TAGS);
    }
   
    render() { 
        return (
            <div className='eventFormRoot'>
            <h1>Create a new event.</h1>
            <form autoComplete="off" className="form" onSubmit={this.handleFormSubmit}>
                <div className="mainContent">
                    <div className="inputs">
                        <TextField label="Event Name" name="eventName" value={this.props.eventName}  onChange={this.handleChange('eventName')} required={true}/>
                        <TextField label="Venue Name" name="venue" required={true} value={this.props.venue} onChange={this.handleChange('venue')}/>
                        <GooglePlaceAutocomplete
                            id="placeAutocompleteEventForm"
                            searchText={this.props.placesSearchText}
                            floatingLabelText="Find Venue Address"
                            onChange={this.props.placesSearchStringUpdate}
                            onNewRequest={this.props.placeSelected}
                            style={{display: "inline-flex", flex: 1, width: "auto"}}
                            name='location'
                            textFieldStyle={{width: '100%'}}
                            listStyle={{width: '100%'}}
                            required={true}
                        />
                        <TextField
                            label="Price"
                            type="number"
                            name="price"
                            onChange={this.handleChange('price')}
                            value={this.props.price}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            required={true}
                        />
                        <TextField
                            label="Date"
                            type="date"
                            name="date"
                            value={this.props.date}
                            onChange={this.handleChange('date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Start Time"
                            type="time"
                            defaultValue="19:30"
                            name="time"
                            value={this.props.startTime}
                            onChange={this.handleChange('startTime')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }} 
                        />
                        <TextField
                            label="Tell us a bit more about your event"
                            multiline
                            rowsMax="6"
                            name="blurb"
                            value={this.props.blurb}
                            onChange={this.handleChange('blurb')}
                            required={true}
                            />
                    </div>
                </div>
                <Button type='submit'>Next</Button>
            </form>
        </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventForm));