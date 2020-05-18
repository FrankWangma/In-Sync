import { userConstants } from "../_constants";

// eslint-disable-next-line import/prefer-default-export
export function userEdit(state = {}, action) {
  switch (action.type) {
    case userConstants.EDIT_REQUEST:
      return { registering: true };
    case userConstants.EDIT_SUCCESS:
      return {};
    case userConstants.EDIT_FAILURE:
      return {};
    default:
      return state;
  }
}
