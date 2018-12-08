const INITIAL_STATE = {
    areas: [],
    selectedArea: null,
    tags: [],
    results: [],
    focusedResult: 0
  };
  
  const applySetSelectedArea = function (state, action) {
    return {
      ...state,
      selectedArea: action.selectedArea
    }
  };

  const applySetAreas = function (state, action) {
    return {
      ...state,
      areas: action.areas
    }
  };

  const applySetTags = function (state, action) {
    const tags = action.tags;
    return {
      ...state,
      tags: tags,
      selectedTags: tags.filter(function (item) {
        return item.selected;
      })
    }
  };

  const applyTagSelected = function (state, action) {
    let tags = Object.assign([], state.tags);    
    tags[action.tag.index].selected = !action.tag.selected;
    return {
      ...state,
      tags
    }
  };

  const applyNewSelectdResult = function (state, action) {
    return {
      ...state,
      focusedResult: action.index
    }
  };

  const applyNewSearchResults = function (state, action) {
    return {
      ...state,
      results: action.results
    }
  }

  function searchReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case 'CURRENT_AREA_SET' : {
        return applySetSelectedArea(state, action);
      }
      case 'SET_AREAS' : {
        return applySetAreas(state, action);
      }
      case 'SET_TAGS' : {
        return applySetTags(state, action);
      }
      case 'TAG_SELECTED' : {
        return applyTagSelected(state, action);
      }
      case 'PROCESS_EVENT_SELECTION' : {
        return applyNewSelectdResult(state, action);
      }
      case 'SEARCH_RESULTS_UPDATED' : {
        return applyNewSearchResults(state, action);
      }
      default : return state;
    }
  }
  
  export default searchReducer;