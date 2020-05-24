import axios from "axios";

// If hosting frontend locally, use local backend too
const url = window.location.host;
let apiURL = "";
if (url.includes("localhost")) {
  apiURL = "http://localhost:5000"
} else {
  apiURL = "https://in-sync-app-backend.herokuapp.com"
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function handleResponse(response) {
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
      localStorage.setItem("token",JSON.stringify(user.token) );
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
  return axios.post(`${apiURL}/register`,{
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
  let updatedUser = {};
  updatedUser = {
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName:user.lastName,
    password: user.password
  }
  console.log(updatedUser);
  const token = JSON.parse(localStorage.getItem("token"));
  return axios.put(`${apiURL}/user/${user.id}`, {updatedUser}, {
    headers: { Authorization: `Bearer ${token}`}
  }).then((user) => {
    localStorage.setItem("user", JSON.stringify(user.data));
    return user.data;
  }).then((response) => handleResponse(response)).catch(error => {
    if (error.response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      window.location.reload(true);
    }
    const newError = (error.response.data && error.response.data.message) || error.response.statusText
    return Promise.reject(newError);
});
}

// eslint-disable-next-line import/prefer-default-export
export const userService = {
  login,
  logout,
  register,
  update,
};
