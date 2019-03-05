const INITIAL_STATE = {
    placesApiLoded: false,
  };
  
  const setPlacesApiLoaded = (state, action) => ({
    ...state,
    placesApiLoded: action.placesApiLoded
  });
  
  function mapReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case 'SEARCH_TEXT_SET' : {
        return setPlacesApiLoaded(state, action);
      }
      default : return state;
    }
  }
  
  export default mapReducer;