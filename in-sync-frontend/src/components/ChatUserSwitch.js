import React, { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ChatComponent from "./ChatComponent";
import UserList from "./UserList";

const ChatUserSwitch = ({ sendMessage }) => {
    const [currentToggle, setCurrentToggle] = useState("chat");

    const chatOrUsers = () => {
        if (currentToggle === "chat") {
            return <ChatComponent className="chat" sendMessage={sendMessage} />
        } else {
            return <UserList />
        }
    };

    return (
        <div className='container'>
            <ToggleButtonGroup
                value={currentToggle}
                exclusive={true}
                onChange={(e, newOption) => {
                    if (newOption) {
                        setCurrentToggle(newOption);
                    }
                }}
            >
                <ToggleButton value="chat">
                    Chat
                </ToggleButton>
                <ToggleButton value="users">
                    User List
                </ToggleButton>
            </ToggleButtonGroup>
            {chatOrUsers()}
        </div>
    );
}

export default ChatUserSwitch;
