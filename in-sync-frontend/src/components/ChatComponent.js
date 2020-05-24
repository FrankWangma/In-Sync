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
    avatar: "http://getdrawings.com/free-icon-bw/free-avatars-icons-6.png",
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

    // eslint-disable-next-line array-callback-return
    const filteredMessages = messages.filter((message) => {
      if (message.sender.name === username) { return message }
    });

    let spam;
    if (filteredMessages.length > 0) {
      if (message !== filteredMessages.pop().text) {
        spam = false;
      } else {
        spam = true;
      }
    } else {
      spam = false;
    }

    if(message && !spam) {
      const newUser = {
        name: username,
        uid: username,
        avatar: "http://getdrawings.com/free-icon-bw/free-avatars-icons-6.png",
      };
      const userMessage = {
        text: message,
        id: messages.length + 1,
        sender: newUser,
      };
      messages.push(userMessage);
    }
  }, [receivedMessage]);

  return (
    <div className='container'>
      <ChatBox messages={messages} user={user} onSubmit={(message) => handleSubmit(message)} />
    </div>
  );
};

export default ChatComponent;
