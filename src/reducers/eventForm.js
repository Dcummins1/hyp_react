// sample data for checking statefulness
const INITIAL_STATE = {
    placesSearchText: "",
    eventName: "",
    location: null,
    coordinate: null,
    venue: "",
    date: "",
    price: "",
    startTime: "",
    blurb: "",
    tags: [],
    selectedTags: [],
    imageLocation: "",
    imageURL: ""
  };
  const applySetPlaceSearchText = (state, action) => ({
    ...state,
    placesSearchText: action.placesSearchText
  });

  const applyFormUpdate = function (state, action) {
      var stateCopy = {...state};
      stateCopy[action.property] = action.value;
      return stateCopy;
  }

  const applyTagSelected = function (state, action) {
    const tags = Object.assign([], state.tags);    
    tags[action.tag.index].selected = !action.tag.selected;
    const selectedTags = tags.filter((tag) => (tag.selected));
    return {
      ...state,
      tags,
      selectedTags
    }
  };
  
  //this is nonsense. tag indexes are subject to change, tags to be mapped by id
  const applySetTags = function (state, action) {
    const tags = action.tags;
    for (var i = 0; i < state.selectedTags.length; i++) {
      tags[state.selectedTags[i].index].selected = true;
    }
    return {
      ...state,
      tags: tags,
      selectedTags: tags.filter(function (item) {
        return item.selected;
      })
    }
  };

  const applyImageUpdated = function (state, action) {
    return {
      ...state,
      imageLocation: action.imageDetails.imageLocation,
      imageURL: action.imageDetails.imageURL
    }
  };

  const applyPlaceSelected = function (state, action) {
    //fragile, some try catch/ error checks...
    const location = action.location.geocodeData[0].geometry.location;
    var coordinate = {lat: location.lat(), lng: location.lng()};
    return {...state, location: action.location, coordinate};
  }
  
  function eventFormReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case 'EVENT_FORM_PLACE_SEARCH_UPDATE' : {
        return applySetPlaceSearchText(state, action);
      }
      case 'EVENT_FORM_UPDATE' : {
          return applyFormUpdate(state, action);
      }
      case 'EVENT_FORM_SET_TAGS' : {
        return applySetTags(state, action);
      }
      case 'EVENT_FORM_TAG_SELECTED' : {
        return applyTagSelected(state, action);
      }
      case 'EVENT_FORM_IMAGE_UPDATED' : {
        return applyImageUpdated(state, action);
      }
      case 'EVENT_FORM_PLACE_SELECTED' : {
        return applyPlaceSelected(state, action);
      }
      case 'EVENT_FORM_UNSET' : {
        return INITIAL_STATE;
      }
      default : return state;
    }
  }
  
  export default eventFormReducer;