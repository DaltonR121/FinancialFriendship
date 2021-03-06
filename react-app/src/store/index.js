import {createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session"
import accounts from "./accounts"
import assets from "./assets"
import creditCards from "./creditCards"
import { REMOVE_USER } from "./session";
import monthlyReoccurrings from "./monthlyReoccurrings"
import otherObligations from "./otherObligations";

const rootReducer = combineReducers({
    session,
    accounts,
    assets,
    creditCards,
    monthlyReoccurrings,
    otherObligations
});

const clearReducer = (state, action) => {
    if (action.type === REMOVE_USER) {
      return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
};


let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
