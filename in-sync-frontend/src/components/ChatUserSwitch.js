import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ChatComponent from "./ChatComponent";
import UserList from "./UserList";

class ChatUserSwitch extends React.Component {
    state = {
        currentToggle: "chat"
    }

    render() {
        return (
            <div className='container'>
                <ToggleButtonGroup
                    value={this.state.currentToggle}
                    exclusive={true}
                    onChange={(e, newOption) => {
                        if (newOption) {
                            this.setState({
                                currentToggle: newOption
                            });
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
                {this.chatOrUsers()}
            </div>
        );
    }

    chatOrUsers() {
        if (this.state.currentToggle === "chat") {
            return <ChatComponent className="chat" />
        } else {
            return <UserList />
        }
    }
}

export default ChatUserSwitch;
