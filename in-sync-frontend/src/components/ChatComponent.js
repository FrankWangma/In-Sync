import React from "react";
import 'react-chatbox-component/dist/style.css';
import { ChatBox } from 'react-chatbox-component';

const messages = [
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
  "uid" : "user1"
}

class ChatComponent extends React.Component {
    render() {
        return (
          <div className='container'>
            <ChatBox messages={messages} user={user} onSubmit={(message) => this.handleSubmit(message)}/>
        </div>
        );
    }

    handleSubmit = message => {
      console.log(message);
    }
}

export default ChatComponent;