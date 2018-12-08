import React, { Component } from 'react';
import CarouselMap from '../../maps/CarouselMap';
import { connect } from 'react-redux';
import { db } from "../../../firebase";
import './Search.css';


function mapStateToProps (state) {
  return {
    tags: state.searchState.tags.filter((item) => {
      return item.selected;
    }),
    area: state.searchState.selectedArea
  }
}
function mapDispatchToProps (dispatch) {
	return {
		updateSearchResults: (results) => {
			const action = {type: "SEARCH_RESULTS_UPDATED", results};
			dispatch(action);
		}
	}
}

class SearchResultsPage extends Component {

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedArea !== this.props.selectedArea ||
      nextProps.tags !== this.props.tags) {
        this._updateSearch();
    }
  }

  _updateSearch () {
    db.getCollection("events").then((areas) => {
      this.props.updateSearchResults(areas);
    });
  }

  render () {
    return (
      <div className="discover">
        <CarouselMap />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);