import { authHeader } from "../_helpers";
import axios from "axios";

const apiURL = "http://localhost:3000";

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function handleResponse(response) {
  console.log(response.data);
  return response.data;
}

function login(username, password) {
    return axios.post(`${apiURL}/login`, {
        username: username,
        password: password,
    }
    ).then(handleResponse)
    .then((user) => {
      /* store user details and jwt token in local storage
      to keep user logged in between page refreshes */
      localStorage.setItem("user", JSON.stringify(user.foundUser));
      localStorage.setItem("token",JSON.stringify(user.token) )
      return user;
    }).catch(error => {
        if (error.response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
          window.location.reload(true);
        }
        const newError = (error.response.data && error.response.data.message) || error.response.statusText
        return Promise.reject(newError);
    })
}

function register(user) {
  return axios.post(`${apiURL}/user/register`,{
    email: user.email,
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName:user.lastName
  }).then(handleResponse).catch(error => {
    if (error.response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      window.location.reload(true);
    }
    const newError = (error.response.data && error.response.data.message) || error.response.statusText
    return Promise.reject(newError);
});
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${apiURL}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteFunction(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${apiURL}/users/${id}`, requestOptions).then(handleResponse);
}

// eslint-disable-next-line import/prefer-default-export
export const userService = {
  login,
  logout,
  register,
  update,
  delete: deleteFunction,
};
