import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { alert } from "./alert.reducer";
import { userEdit } from "./userEdit.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  userEdit,
});

export default rootReducer;
