import React from "react";
import 'react-chatbox-component/dist/style.css';
import { ChatBox } from 'react-chatbox-component';

// Messages would populate from incoming messages as well as messages sent by this client
let messages = [
  {
    "text": "Hello there",
    "id": "1",
    "sender": {
      "name": "Ironman",
      "uid": "user1",
      "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
    },
  },
  {
    "text": "Hi",
    "id": "2",
    "sender": {
      "name": "Spiderman",
      "uid": "user2",
      "avatar": "https://data.cometchat.com/assets/images/avatars/spiderman.png",
    },
  },
]

const user = {
  "name": "Ironman",
  "uid": "user1",
  "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
}

class ChatComponent extends React.Component {
  render() {
    return (
      <div className='container'>
        <ChatBox messages={messages} user={user} onSubmit={(message) => this.handleSubmit(message)} />
      </div>
    );
  }

  handleSubmit = message => {
    // Template of sent message by this client
    const userMessage = {
      "text": message,
      "id": messages.length + 1,
      "sender": user,
    }

    // New message would also be pushed out to other clients at this point
    messages.push(userMessage);
  }
}

export default ChatComponent;