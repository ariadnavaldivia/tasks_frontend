import { createStore ,applyMiddleware} from "redux";

import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";

const initialState = {};
const middleware = [thunk];
export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
const makeStore = (context) => store;

export const wrapper = createWrapper(makeStore, { debug: true });