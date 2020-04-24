import React from "react";
import styles from  "./UserList.module.css";

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
    (<div className={styles.userInfo}>
      <img className={styles.userPic} src={user.avatar} alt="User avatar" />
      <p className={styles.userName}>{user.name}</p>
    </div>);

  return (
    <div className={styles.container}>
      {users.map((user, index) => <div key={index} >{displayUser(user)}</div>)}
    </div>
  );
};

export default UserList;
