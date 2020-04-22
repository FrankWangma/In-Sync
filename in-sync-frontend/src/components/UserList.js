import React from "react";
import 'react-chatbox-component/dist/style.css';
import { ChatBox } from 'react-chatbox-component';

// Users would populate from backend
let users = [
  {
    "name": "Ironman",
    "uid": "user1",
    "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
  },
  {
    "name": "Spiderman",
    "uid": "user2",
    "avatar": "https://data.cometchat.com/assets/images/avatars/spiderman.png",
  },
]

const UserList = () => {
  return (
    <div className='container'>
      <ChatBox />
    </div>
  );
}

export default UserList;
