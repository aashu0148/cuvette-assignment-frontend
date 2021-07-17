const initialState = {
  currentData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURR_DATA": {
      const myState = { ...state };
      myState.currentData = action.data;
      return myState;
    }

    default:
      return state;
  }
};

export default reducer;
