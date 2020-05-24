import React, { useState, useEffect } from "react";
import "react-chatbox-component/dist/style.css";
import { ChatBox } from "react-chatbox-component";

// Messages would populate from incoming messages as well as messages sent by this client
const messages = [];

const ChatComponent = ({ sendMessage, receivedMessage, currentUser }) => {
  const [, setMessageData] = useState([]);
  const user = {
    name: currentUser,
    uid: currentUser,
    avatar: "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png",
  };

  const handleSubmit = (message) => {
    // Template of sent message by this client
    const userMessage = {
      text: message,
      id: messages.length + 1,
      sender: user,
    };

    // New message would also be pushed out to other clients at this point
    messages.push(userMessage);

    sendMessage(message);
  };

  useEffect(() => {
    setMessageData(receivedMessage)
    const {message, username} = receivedMessage;
    if(message) {
      const user = {
        name: username,
        uid: username,
        avatar: "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png",
      }; 
      const userMessage = {
        text: message,
        id: messages.length + 1,
        sender: user,
      };
      messages.push(userMessage);
    }
  },[receivedMessage])

  return (
    <div className='container'>
      <ChatBox messages={messages} user={user} onSubmit={(message) => handleSubmit(message)} />
    </div>
  );
};

export default ChatComponent;
