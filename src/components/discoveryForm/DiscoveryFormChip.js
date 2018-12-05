import React from "react";
import { connect } from 'react-redux';

import { db } from "../../firebase/";

import SingleSelectChipsArray from "../chips/SingleSelectChipsArray";
import MultiSelectChipsArray from "../chips/MultiSelectChipArray";

function mapStateToProps (state) {
    return {
        selectedArea: state.searchState.selectedArea,
        areas: state.searchState.areas,
        tags: state.searchState.tags
    }
}

function mapDispatchToProps (dispatch) {
    return {
        
        initAreas: (areas) => {
            const action = {type: "SET_AREAS", areas: areas};
            dispatch(action);
        },
        initTags: (tags) => {
            const action = {type: "SET_TAGS", tags: tags};
            dispatch(action);
        },
        onAreaSelection: (e, area) => {
            const action = {type: "CURRENT_AREA_SET", selectedArea: area};
            dispatch(action);
        },
        onTagSelection: (e, tag) => {
            const action = {type: "TAG_SELECTED", tag: tag};
            dispatch(action);
        }
    }
}


class DiscoveryFormChip extends React.Component {
    constructor (props) {
        super(props);
        db.getCollection("areas").then((areas) => {
          props.initAreas(areas);
        });
        db.getCollection("tags").then((tagNames) => {
            var tags = [];
            for(let tag in tagNames) {
                var tagObj = tagNames[tag];
                tags.push({...tagObj, selected: false, index: tag});
            }
            props.initTags(tags);
        });
    }

    render () {
        return (
            <div className="discoverRoot">
                <div className="searchRegionSelect">
                    I'm in
                    <br/>
                    <SingleSelectChipsArray
                        data={this.props.areas}
                        color="primary"
                        selectionListener={this.props.onAreaSelection}
                        selected={this.props.selectedArea}/>
                </div>
                <div className="genreSelect">
                    and I want 
                    <br/>
                    <MultiSelectChipsArray data={this.props.tags} selectionListener={this.props.onTagSelection} color="secondary"/>
                </div>
            </div>
        );
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryFormChip);
