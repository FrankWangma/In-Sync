import React, { useEffect, useState } from "react";
import "react-chatbox-component/dist/style.css";
import { ChatBox } from "react-chatbox-component";

// Messages would populate from incoming messages as well as messages sent by this client
const messages = [
  {
    text: "Hello there",
    id: "1",
    sender: {
      name: "Ironman",
      uid: "user1",
      avatar: "https://data.cometchat.com/assets/images/avatars/ironman.png",
    },
  },
  {
    text: "Hi",
    id: "2",
    sender: {
      name: "Spiderman",
      uid: "user2",
      avatar: "https://data.cometchat.com/assets/images/avatars/spiderman.png",
    },
  },
];

const user = {
  name: "Ironman",
  uid: "user1",
  avatar: "https://data.cometchat.com/assets/images/avatars/ironman.png",
};

const ChatComponent = ({ sendMessage, receivedMessage }) => {
  const [messageData, setMessageData] = useState([]);
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
    setMessageData(receivedMessage);
    const {message, username} = receivedMessage;
    if(message) {
      const user = {
        name: username,
        uid: username,
        avatar: "https://data.cometchat.com/assets/images/avatars/ironman.png",
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
