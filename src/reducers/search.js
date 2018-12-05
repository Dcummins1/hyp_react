const INITIAL_STATE = {
    areas: [],
    selectedArea: null,
    tags: []
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
      default : return state;
    }
  }
  
  export default searchReducer;