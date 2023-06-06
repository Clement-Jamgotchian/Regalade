import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const enhancers = composeEnhancers(applyMiddleware());

const store = createStore(rootReducer, enhancers);

export default store;
