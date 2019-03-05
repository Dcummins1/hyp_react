import React from 'react'
import { maps } from '../../../config'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

import TextField from '@material-ui/core/TextField';
import './PlacesDropdown.css'


class PlacesDropdown extends React.Component {
    state = {
        apiLoaded: false
    }
    // componentDidMount() {
    //     var script = document.getElementById("placesScriptTag");
    //     if (!script) {
    //         const s = document.createElement('script');
    //         s.type = 'text/javascript';
    //         s.async = true;
    //         s.id = "placesScriptTag";
    //         s.src="https://maps.googleapis.com/maps/api/js?key=" + maps.apiKey + "&libraries=places&callback=mapsCallback";
    //         s.onLoad = this._placesApiLoaded();
    //         window.mapsCallback = function () {
    //             console.log('maps really loaded');
    //             this.setState({apiLoaded: true});
    //         }.bind(this);
    //         document.head.appendChild(s);
    //     } 
    // }
    _placesApiLoaded () {
        console.log('maps loaded');
    }
    constructor(props) {
        super(props);
        this.state = { address: '' };
      }
     
      handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
          this.setState({ address });
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
      };
     
      render() {
          if (this.state.apiLoaded) {
            
            return (<PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className='inputContainer'>
                <TextField style={{flex: 1}}
                  {...getInputProps({
                    label: 'Select address',
                    className: 'location-search-input',
                    variant: 'outlined',
                    margin: 'normal'
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>)
          } else {
              return (<div>Loading...</div>)
          }
          
    }
}

export default PlacesDropdown;