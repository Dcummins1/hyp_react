import React from 'react';
//TODO: update this to use the new material ui. This is basically a copy of a third party lib. needs to be adapted, probably credited. May have to give them a pull request
import { AutoComplete } from 'material-ui';
import PropTypes from 'prop-types';
import { maps } from '../../../config';

class GooglePlaceAutocomplete extends React.Component {

  autocompleteService = null;
  geocoder = null;
  constructor(props) {
    super(props);
    this.onNewRequest = this.onNewRequest.bind(this);
    this.state = {
      dataSource: [],
      data: []
    };
  }

  componentDidMount() {
    var script = document.getElementById("placesScriptTag");
    //TODO: formalize this api loading into a helper class. I think we have the possibility of loading the api multiple times here, which is bad.
    if (!script) {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.id = "placesScriptTag";
        s.src="https://maps.googleapis.com/maps/api/js?key=" + maps.apiKey + "&libraries=places&callback=mapsCallback";
        window.mapsCallback = function () {
            this.autocompleteService = new window.google.maps.places.AutocompleteService();
            this.geocoder = new window.google.maps.Geocoder();
        }.bind(this);
        document.head.appendChild(s);
      } 
    }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.onUpdateInput(nextProps.searchText, this.state.dataSource);
      this.onInputChange(nextProps.searchText);
    }
  }

  updateDatasource(data) {
    if (!data || !data.length) {
      return false;
    }

    if (this.state.data) {
      this.previousData = { ...this.state.data };
    }
    this.setState({
      dataSource: data.map(place => place.description),
      data
    });
  }

  getBounds() {
    if (!this.props.bounds || (!this.props.bounds.ne && !this.props.bounds.south)) {
      return undefined;
    }

    if (this.props.bounds.ne && this.props.bounds.sw) {
      return new window.google.maps.LatLngBounds(this.props.bounds.sw, this.props.bounds.ne);
    }

    return {
      ...this.props.bounds
    };
  }

  onUpdateInput(searchText, dataSource) {
    if (!searchText.length || !this.autocompleteService) {
      return false;
    }

    let request = {
      input: searchText,
      location: new window.google.maps.LatLng(this.props.location.lat, this.props.location.lng),
      radius: this.props.radius,
      types: this.props.types,
      bounds: this.getBounds()
    };

    if (this.props.restrictions) {
      request.componentRestrictions = { ...this.props.restrictions };
    }

    this.autocompleteService.getPlacePredictions(request, data => this.updateDatasource(data));
  }

  onNewRequest(searchText, index) {
    // The index in dataSource of the list item selected, or -1 if enter is pressed in the TextField
    if (index === -1) {
      return false;
    }
    const data = this.previousData || this.state.data;
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({placeId: data[index].place_id}, (geocodeData) => {
      this.props.onNewRequest({searchData: data[index], geocodeData}, searchText, index);
    });
  }

  onInputChange(searchText, dataSource, params) {
    this.props.onChange({target: {value: searchText}}, dataSource, params);
  }

  render() {
    const {
      location, radius, bounds, types, restrictions, ...autoCompleteProps // eslint-disable-line no-unused-vars
    } = this.props;

    return (
      <AutoComplete
        openOnFocus={true}
        {...autoCompleteProps}
        ref={this.props.getRef}
        filter={this.props.filter}
        onUpdateInput={this.onInputChange.bind(this)}
        dataSource={this.state.dataSource}
        atyle={{flex: "initial"}}
        onNewRequest={this.onNewRequest.bind(this)}
      />
    );
  }
}

GooglePlaceAutocomplete.propTypes = {
  location: PropTypes.object,
  radius: PropTypes.number,
  onNewRequest: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  getRef: PropTypes.func,
  types: PropTypes.arrayOf(PropTypes.string),
  bounds: PropTypes.object,
  restrictions: PropTypes.shape({
    country: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  })
};

GooglePlaceAutocomplete.defaultProps = {
  location: {lat: 0, lng: 0},
  radius: 0,
  filter: AutoComplete.noFilter
};

export default GooglePlaceAutocomplete;
