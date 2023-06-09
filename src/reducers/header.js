import { SET_SEARCH_VALUE } from '../actions/header';

const initialState = {
  searchBarValue: '',
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchBarValue: action.payload.newSearchBarValue,
      };
    default:
      return state;
  }
}

export default reducer;
