import React from "react";
import styles from "./UserList.module.css";

const avatar = 'https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png';
const UserList = ({users}) => {
  const displayUser = (user) => (
      <div className={styles.userInfo}>
        <img className={styles.userPic} src={avatar} alt="User avatar" />
        <p className={styles.userName}>{user}</p>
      </div>
  );
  console.log(users)

  return (
    <div className={styles.container}>
      <div>{displayUser(users.host)}</div>
      {users.viewers.map((user, index) => <div key={index} >{displayUser(user)}</div>)}
    </div>
  );
};

export default UserList;
