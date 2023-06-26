export const SET_WIDTH_VALUE = 'SET_WIDTH_VALUE';
export const setWidthValue = (Value) => ({
  type: SET_WIDTH_VALUE,
  payload: {
    isTrue: Value,
  },
});
export const SET_CURRENT_BUTTON_ID = 'SET_CURRENT_BUTTON_ID';
export const setCurrentButtonId = (id) => ({
  type: SET_CURRENT_BUTTON_ID,
  payload: {
    currentButtonId: id,
  },
});
export const SET_LINK = 'SET_LINK';
export const setLink = (link) => ({
  type: SET_LINK,
  payload: {
    currentLink: link,
  },
});

export const SET_ACTIV_PAGE_PROFIL = 'SET_ACTIV_PAGE_PROFIL';
export const setActivPage = (page) => ({
  type: SET_ACTIV_PAGE_PROFIL,
  payload: {
    currentActivPage: page,
  },
});
