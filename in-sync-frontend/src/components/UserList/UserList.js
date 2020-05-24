import React from "react";
import Star from "@material-ui/icons/Star";
import styles from "./UserList.module.css";

const avatar = "http://getdrawings.com/free-icon-bw/free-avatars-icons-6.png";
const UserList = ({ users }) => {
  const displayUser = (user) => (
      <div className={styles.userInfo}>
        <img className={styles.userPic} src={avatar} alt="User avatar" />
        {user === users.host ? <Star className={styles.hostStar}/> : <div />}
        <p className={styles.userName}>{user}</p>
      </div>
  );

  return (
    <div className={styles.container}>
      {[...new Set(users.viewers)].map((user, index) => <div key={index} >
      {displayUser(user)}
      </div>)}
    </div>
  );
};

export default UserList;
