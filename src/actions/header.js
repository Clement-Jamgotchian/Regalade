export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const setSearchValue = (newSearchValue) => ({
  type: SET_SEARCH_VALUE,
  payload: {
    newSearchBarValue: newSearchValue,
  },
});
