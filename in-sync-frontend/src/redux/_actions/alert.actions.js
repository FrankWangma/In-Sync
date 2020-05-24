import { alertConstants } from "../_constants";

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}

// eslint-disable-next-line import/prefer-default-export
export const alertActions = {
  success,
  error,
  clear,
};
