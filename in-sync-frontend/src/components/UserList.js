import React from "react";
import 'react-chatbox-component/dist/style.css';
import { ChatBox } from 'react-chatbox-component';

class UserList extends React.Component {
    render() {
        return (
          <div className='container'>
            <ChatBox />
        </div>
        );
    }
}

export default UserList;
