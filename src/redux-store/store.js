import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root.reducer";

// rootReducer
const middleware = [logger];
const enhancers = compose(applyMiddleware(...middleware));

export const store = createStore(rootReducer, undefined, enhancers);
