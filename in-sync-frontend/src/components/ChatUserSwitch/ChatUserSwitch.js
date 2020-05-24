import React, { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ChatComponent from "../ChatComponent";
import UserList from "../UserList/UserList";
import styles from "./ChatUserSwitch.module.css";

const ChatUserSwitch = ({
  sendMessage, users, receivedMessage, currentUser,
}) => {
  const [currentToggle, setCurrentToggle] = useState("chat");

  const chatOrUsers = () => {
    if (currentToggle === "chat") {
      return <ChatComponent className="chat" sendMessage={sendMessage} receivedMessage={receivedMessage} currentUser={currentUser} />;
    }
    return <UserList users={users} />;
  };

  return (
        <div className='container'>
            <ToggleButtonGroup
                className={styles.switch}
                value={currentToggle}
                exclusive={true}
                onChange={(e, newOption) => {
                  if (newOption) {
                    setCurrentToggle(newOption);
                  }
                }}
            >
                <ToggleButton className={styles.oneSwitch} value="chat">
                    Chat
                </ToggleButton>
                <ToggleButton className={styles.oneSwitch} value="users">
                    User List
                </ToggleButton>
            </ToggleButtonGroup>
            {chatOrUsers()}
        </div>
  );
};

export default ChatUserSwitch;
