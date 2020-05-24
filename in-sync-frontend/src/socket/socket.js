import socketIOClient from "socket.io-client"

const ENDPOINT = 'https://in-sync-app-backend.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

export default socket;