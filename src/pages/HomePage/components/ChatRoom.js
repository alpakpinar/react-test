import React from 'react';
import './ChatRoom.css';
import './RightSidebar.css';
import { io } from 'socket.io-client';
// import { MessageBox } from 'react-chat-elements';
import RightSidebar from './RightSidebar'

const NEW_CHAT_MESSAGE_EVENT = 'new_chat_message';
const USER_LEFT_EVENT = 'user_left';
const USER_TYPING_EVENT = 'user_typing';
const USER_STOPPED_TYPING_EVENT = 'user_stopped_typing';
const SOCKET_SERVER_URL = 'http://localhost:8080';

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.roomId,
            messagelist: [],
            current_message: '',
            userTypingMsg: '',
            userJoinedOrLeftMsg: '',
            socket: io(SOCKET_SERVER_URL),
        }

        // Send username, user ID (socket ID) and room ID
        this.state.socket.emit('new_connection', this.props.username, this.state.socket.id, this.props.roomId)

        // Fetch messages from database and update the message list of the component state
        this.fetchData(this.props.roomId)

        this.handleNewMessageChange = this.handleNewMessageChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    fetchData(roomId) {
        /* Load in the messages and contacts for this chat group. */
        fetch(`/api/chatrooms/${roomId}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(jsonResponse => {
            // Double check: If no room was found, just set the message list to be an empty array (for now)
            if (jsonResponse?.message === 'Chat room not found') {
                this.setState({
                    messagelist: []
                })
                return
            }
            // If there is a room (ideally there should be) then get the messages and set the component state accordingly
            this.setState({
                messagelist: jsonResponse.messagelist,
                roomId: roomId,
                contacts: jsonResponse.contacts
            })
        })
    }

    scrollToBottom() {
        // Automatically scroll to the bottom of the message list
        this.messagesEnd.scrollIntoView({behavior: "smooth"})
    }

    componentDidUpdate(prevProps) {
        this.scrollToBottom()
        const newRoomId = this.props.roomId;
        if (prevProps.roomId !== newRoomId)  {
            // Send a "new connection" event to server with the new room ID
            this.state.socket.emit('new_connection', this.props.username, this.state.socket.id, newRoomId)

            // Fetch and update the messages being rendered for this specific room
            this.fetchData(newRoomId)
        }
    }

    async componentDidMount() {
        this.scrollToBottom()

        // Listen for incoming messages
        this.state.socket.on(NEW_CHAT_MESSAGE_EVENT, message => {
            // Add the incoming message to the chat history and render
            const newMessageList = this.state.messagelist.concat([message]);
            this.setState({
                messagelist: newMessageList
            });
        });

        // Listen for "user typing" events
        this.state.socket.on(USER_TYPING_EVENT, (data) => {
            this.setState({
                userTypingMsg: `${data.username} is typing...`
            });
        });

        // Listen for "user stopped typing" events
        this.state.socket.on(USER_STOPPED_TYPING_EVENT, (data) => {
            this.setState({
                userTypingMsg: ""
            });
        });

        this.state.socket.on(USER_LEFT_EVENT, (data) => {
            this.setState({
                userJoinedOrLeftMsg: this.state.userJoinedOrLeftMsg + `${data.username} left the chat.`
            });
        });
    }

    handleNewMessageChange(e) {
        e.preventDefault();
        this.setState({current_message: e.target.value});

        this.state.socket.emit(USER_TYPING_EVENT, {
            username: this.props.username
        })

        if (e.target.value === '') {
            this.state.socket.emit(USER_STOPPED_TYPING_EVENT, {
                username: this.props.username
            })
        }
    }

    handleSendMessage(e) {
        e.preventDefault();
        // Emit chat message to server (only non-empty messages)
        if (this.state.current_message === '') {
            return
        }
        const senderId = this.state.socket.id
        const message_payload = {
            body: this.state.current_message,
            senderId: senderId,
            senderUsername: this.props.username,
            date: new Date()

        }
        // Emit the new chat message data
        this.state.socket.emit(NEW_CHAT_MESSAGE_EVENT, message_payload)

        // Clear the text field
        this.setState({current_message: ""})

        this.state.socket.emit(USER_STOPPED_TYPING_EVENT, {
            userId: this.state.socket.id,
            username: this.props.username
        });
    }

    handleExit(e) {
        this.state.socket.emit(USER_LEFT_EVENT, {
            userId: this.state.socket.id,
            username: this.props.username
        });
    }

    onKeyDown(e) {
        // If user hits enter, submit message
        // Otherwise do nothing
        if (e.keyCode === 13) {
            e.preventDefault();
            this.handleSendMessage(e);
        }
        else {
            return
        }
    }

    renderMessages() {
        /* Helper function to render the message list from the state of the component. */
        return this.state.messagelist.map((message, i) => {
            // This one is only for "user joined" or "user left" messages
            if (message?.type === 'user-notification') {
                return (
                    <div className="user-joined-left-msg">
                        <p><i>{message.body}</i></p>
                    </div>
                )
            }
            // This one is for all other normal messages
            else {
                return (
                    <div className={`single-message-container ${
                        message.senderUsername === this.props.username ? "my-message" : "received-message" 
                    }`}>
                        <li
                            key={i}
                            className={`message-item ${
                                message.senderUsername === this.props.username ? "my-message" : "received-message" 
                            }`}
                        >
                            {message.body}
                        </li>
                        <span className="username-stamp">{message.senderUsername}, {new Date(message.date).toString().split(' ').slice(4,5).join(' ')}</span>
                    </div>
                    )}
                }
            )
    }

    render() {
        return (
            <div className="chat-room-container">
                {/* Chat section in the middle */}
                <div className="chat-section-container" style={this.state.roomId.startsWith("c-room") ? {flex: "0 0 75%"} : {flex: "0 0 100%"}}>
                    <div className="messages-container">
                        <ol className="messages-list">
                            {this.renderMessages()}
                        </ol>
                        <div ref={el => this.messagesEnd = el}>
                        </div>
                        <div className="user-typing-msg">
                            <p><i>{this.state.userTypingMsg}</i></p>
                        </div>
                        <div className="user-joined-left-msg">
                            <p><i>{this.state.userJoinedOrLeftMsg}</i></p>
                        </div>
                    </div>
                    <textarea
                        value={this.state.current_message}
                        onChange={this.handleNewMessageChange}
                        placeholder="Write message..."
                        className="new-message-input-field"
                        onKeyDown={this.onKeyDown}
                        />
                </div>
                {/* Sidebar on the right hand side of the page */}
                <div className="sidebar-right-container">
                    {(this.state.contacts && this.state.roomId.startsWith("c-room")) ? <RightSidebar contacts={this.state.contacts} /> : <div></div>}
                </div>
            </div>
        )
    }
}
    
export default ChatRoom;