import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../_reducers";


// eslint-disable-next-line import/prefer-default-export
export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
  ),
);
