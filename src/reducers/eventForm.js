// sample data for checking statefulness
const INITIAL_STATE = {
    placesSearchText: "",
    eventName: "Sam's Party!",
    location: null,
    venue: "The Workman's Club",
    date: "2019-02-07",
    price: "10",
    startTime: "19:30",
    blurb: "It's Going to be great, please Come. There will be live music from 8:30 and then a Dj til late. Lots of great drink offers including but not limited to Guiness at regular price, and mojitos at only slightly above regular price.",
    tags: [],
    selectedTags: [],
    imageLocation: "",
    imageURL: "https://firebasestorage.googleapis.com/v0/b/hypbackend.appspot.com/o/eventImages%2Fparty.jpeg?alt=media&token=17ea7250-c9e6-43f1-b91f-26a3edcee5c0"
  };
  INITIAL_STATE.selectedTags = [
    {name: "Drink Promos", type: "drinks", selected: false, index: "2"},
    {name: "Electronic", type: "genre", selected: false, index: "3"},
    {name: "Free Entry", selected: true, index: "4"},
    {name: "Late Bar", type: "drinks", selected: true, index: "5"}
  ];
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
    console.log(action);
    return {...state, location: action.location};
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
      default : return state;
    }
  }
  
  export default eventFormReducer;