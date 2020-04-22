import React from "react";
import "./UserList.css";

// Users would populate from backend
const users = [
  {
    name: "Ironman",
    uid: "user1",
    avatar: "https://data.cometchat.com/assets/images/avatars/ironman.png",
  },
  {
    name: "Spiderman",
    uid: "user2",
    avatar: "https://data.cometchat.com/assets/images/avatars/spiderman.png",
  },
];

const UserList = () => {
  const displayUser = (user) =>
    (<div className="userInfo">
      <img className="userPic" src={user.avatar} alt="User avatar" />
      <p className="userName">{user.name}</p>
    </div>);

  return (
    <div className='container'>
      {users.map((user, index) => <div key={index} >{displayUser(user)}</div>)}
    </div>
  );
};

export default UserList;
