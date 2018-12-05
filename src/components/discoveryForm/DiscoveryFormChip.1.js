import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { db } from "../../firebase/"
import SingleSelectChipsArray from "../chips/SingleSelectChipsArray"
import MultiSelectChipsArray from "../chips/MultiSelectChipArray"

function mapStateToProps (state) {
    return {
        tags: state.tags.filter(function (item) {
            return item.selected;
        }),
        area: state.selectedArea
    }
}

class DiscoveryFormChip extends React.Component {
  state = {
      areas: [],
      tags: [],
      selectedGenre: null,
      selectedArea: null
  };

  constructor (props) {
      super(props);
      db.getCollection("tags").then((tagNames) => {
        var tags = [];
        for(let tag in tagNames) {
            var tagObj = tagNames[tag];
            tags.push({...tagObj, selected: false, index: tag});
        }
        this.setState({"tags": tags});
      });
      db.getCollection("areas").then((areas) => {
        this.setState({"areas": areas});
      });
      this._handleAreaSelection = this._handleAreaSelection.bind(this);
      this._handleTagSelection = this._handleTagSelection.bind(this);
  }

  _handleAreaSelection (e, id) {
      this.setState({selectedArea: id});
  }
  _handleTagSelection (e, tag) {
      let tags = Object.assign([], this.state.tags);    
      tags[tag.index].selected = !tag.selected;
      this.setState({tags});
  }

  render() {
    console.log(mapStateToProps(this.state));
    return (
        <div className="discoverRoot">
            <div className="searchRegionSelect">
                I'm in
                <br/>
                <SingleSelectChipsArray data={this.state.areas} color="primary" selectionListener={this._handleAreaSelection} selected={this.state.selectedArea}/>
            </div>
            <div className="genreSelect">
                and I want 
                <br/>
                <MultiSelectChipsArray data={this.state.tags} selectionListener={this._handleTagSelection} color="secondary"/>
            </div>
        </div>
        );
  }
}

export default connect(mapStateToProps)(withRouter(DiscoveryFormChip));
