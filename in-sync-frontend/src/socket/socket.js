import socketIOClient from "socket.io-client";

// If hosting frontend locally, use local backend too
const url = window.location.host;
let ENDPOINT = "";
if (url.includes("localhost")) {
  ENDPOINT = "http://localhost:5000";
} else {
  ENDPOINT = "https://in-sync-app-backend.herokuapp.com";
}

const socket = socketIOClient(ENDPOINT);

export default socket;
