import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./alert.actions";
import { history } from "../_helpers";

function login(username, password) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        (user) => {
          dispatch(success(user));
          history.goBack();
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(user));

    userService.register(user)
      .then(
        (user) => {
          dispatch(success(user));
          history.goBack();
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };
}

function edit(user) {
  function request(user) { return { type: userConstants.EDIT_REQUEST, user }; }
  function success(user) { return { type: userConstants.EDIT_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.EDIT_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(user));

    userService.update(user)
      .then(
        (user) => {
          dispatch(success(user));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };
}

// eslint-disable-next-line import/prefer-default-export
export const userActions = {
  login,
  logout,
  register,
  edit,
};
