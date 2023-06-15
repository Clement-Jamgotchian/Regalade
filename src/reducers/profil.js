import {
  SET_WIDTH_VALUE,
  SET_CURRENT_BUTTON_ID,
  SET_LINK,
  SET_ACTIV_PAGE_PROFIL,
} from '../actions/profil';

const initialState = {
  isTrueWidth: null,
  profilButtonId: null,
  link: '',
  activProfilPage: '',
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_WIDTH_VALUE:
      return {
        ...state,
        isTrueWidth: action.payload.isTrue,
      };
    case SET_CURRENT_BUTTON_ID:
      return {
        ...state,
        profilButtonId: action.payload.currentButtonId,
      };
    case SET_LINK:
      return {
        ...state,
        link: action.payload.currentLink,
      };
    case SET_ACTIV_PAGE_PROFIL:
      return {
        ...state,
        activProfilPage: action.payload.currentActivPage,
      };
    default:
      return state;
  }
}

export default reducer;
