import React from 'react';
import './HomePage.css';
import Navigation from '../LandingPage/components/Navigation';
import ChatRoom from './components/ChatRoom';
import NewChatGroupForm from './components/NewChatGroupForm';
import {Redirect} from 'react-router-dom';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        let username = null;
        if (sessionStorage.getItem('token') !== null) {
            username = JSON.parse(sessionStorage.getItem('token')).username;
        }

        else if (localStorage.getItem('token') !== null) {
            username = JSON.parse(localStorage.getItem('token')).username;    
        }
        
        this.state = {
            username: username,
            chat_rooms: [], // Initially empty, to be fetched from the database and updated as page loads
            contacts: [], // Initially empty, to be fetched from the database and updated as page loads
            announcement_rooms: [
                {roomId: "a-room-1", name: "# Staj", type: "announcement"},
                {roomId: "a-room-2", name: "# Ev/Yurt", type: "announcement"},

            ],
            activeTabId: null
        };
        this.isActiveTab = this.isActiveTab.bind(this);
        this.changeActiveTab = this.changeActiveTab.bind(this);
        this.renderMainSide = this.renderMainSide.bind(this);
        this.handleExitGroup = this.handleExitGroup.bind(this);
        this.userLoggedIn = this.userLoggedIn.bind(this);
    }
    
    handleLogout(e) {
        /* 
        Upon logout, remove the user tokens from the session and local storages.
        Token in local storage may or may not exist, but we still need to check there.
        */
        e.preventDefault();
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        window.location.reload();
    }

    userLoggedIn() {
        // Check the session and local storages for user token
        const tokenStringFromSS = sessionStorage.getItem('token');
        const userTokenFromSS = JSON.parse(tokenStringFromSS);
        if (userTokenFromSS?.token) {
            return true
        }

        const tokenStringFromLS = localStorage.getItem('token')
        const userTokenFromLS = JSON.parse(tokenStringFromLS)
        if (userTokenFromLS?.token) {
            return true
        }
        return false
    }

    handleExitGroup(e) {
        /* Handle the situation where user selects to leave the group. */
        e.preventDefault()
        // We send a DELETE request to /api/chatrooms/{roomId} to remove the user from the selected chat room
        const request_body = {
            usernameToRemove: this.state.username
        }
        fetch(`/api/chatrooms/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(request_body)
        })
        .then(response => response.json())
        .then(jsonResponse => {
            // Just reload the home page after successful deletion of the chat room (prone to some bugs)
            window.location.reload()
        })
    }

    isActiveTab(tabId) {
        return this.state.activeTabId === tabId;
    }

    changeActiveTab(e) {
        e.preventDefault();
        const tabId = e.target.id;
        this.setState({activeTabId: tabId});
    }

    getHeader(all_rooms) {
        /* Get the appropriate header for the room we're displaying on the right hand side of the main screen */
        let header = null;
        if (this.state.activeTabId === null) {
            header = ''
        }
        else if (this.state.activeTabId.includes('room')) {
            header = all_rooms.find(room => room.roomId === this.state.activeTabId).name
        }
        // DM messages, display the username as header
        else if (this.state.activeTabId.includes('dm')) {
            header = this.state.contacts.find(contact => contact.roomId === this.state.activeTabId).username
        }
        else { 
            header = 'Yeni Grup Olustur'
        }
        return header
    }

    componentDidMount() {
        fetch(`/api/users/${this.state.username}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            this.setState({
                chat_rooms: jsonResponse.chatgroups,
                contacts: jsonResponse.contacts
            })
        })
    }

    renderMainSide() {
        /* Render right side of the home page depending on the tab being selected. */
        const activeTabId = this.state.activeTabId;
        // Empty page if no tab is selected (initial default)
        if (activeTabId === null) {
            return <></>
        }
        // Chat rooms: Group chat rooms or DM message rooms
        else if (activeTabId.includes('room') || activeTabId.includes('dm')) {
            return (
                <ChatRoom 
                    username={this.state.username}
                    roomId={activeTabId}
                />
            );
        }
        // New chat group creation form
        else if (this.state.activeTabId.includes('new')) {
            // Need to create an additional ID "c-room-idx" for the new room being created
            // In the database, we store each room with an ID like "c-room-idx-generated_hash" 
            // (in addition to _id generated by mongodb)
            let newRoomId;
            if (this.state.chat_rooms.length !== 0) {
                const latestId = this.state.chat_rooms[this.state.chat_rooms.length - 1].roomId
                const latestIdSplit = latestId.split('-')
                newRoomId = `c-room-${Number(latestIdSplit[latestIdSplit.length-2]) + 1}`
            }
            // If there are no other chat rooms present, this would be the first one with ID: "c-room-1"
            else {
                newRoomId = "c-room-1"
            }
            return (
                <NewChatGroupForm username={this.state.username} contacts={this.state.contacts} newRoomId={newRoomId}/>
            )
        }
    }

    render() {
        // Login needed for access to this page
        // If we can't find the login token stored, redirect to login page
        if (!this.userLoggedIn()) {
            return <Redirect to="/login" />
        }

        const all_rooms = this.state.chat_rooms.concat(this.state.announcement_rooms);

        return (
            <div className="home-container">
                <Navigation handleLogout={this.handleLogout} displayLogoutButton={true} />
                <div className="flex-container">
                    <div className="home-sidebar">
                        <div className="username-container">
                            <h2>{this.state.username}</h2>
                        </div>
                        <div className="chat-rooms-container">
                            <h3 className="room-header">Chat Odalari</h3>
                            <ul className="room-list">
                                {this.state.chat_rooms.map((room => (
                                    <li id={room.roomId} 
                                    onClick={this.changeActiveTab} 
                                    className={`room-item ${this.isActiveTab(room.roomId) ? "active" : ""}`}>
                                        {room.name}
                                        <div className="chat-close-button-container">
                                            <a className="chat-close-button" id={room.roomId} onClick={this.handleExitGroup}></a>
                                            <span className="chat-close-button-tooltip">Gruptan Ayrıl</span>
                                        </div>
                                    </li>
                                )))}
                                <li 
                                id="new-chat-group" 
                                className="new-room-item"
                                onClick={this.changeActiveTab}>
                                    Yeni oda yarat
                                </li>
                            </ul>
                        </div>
                        <div className="announcement-rooms-container">
                            <h3 className="room-header">Anons Odalari</h3>
                            <ul className="room-list">
                                {this.state.announcement_rooms.map(room => (
                                    <li id={room.roomId} 
                                    onClick={this.changeActiveTab} 
                                    className={`room-item ${this.isActiveTab(room.roomId) ? "active" : ""}`}>
                                        {room.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="contacts-container">
                            <h3 className="room-header">Arkadaslar</h3>
                            <ul className="contact-list">
                                {this.state.contacts.map(contact => (
                                    <li id={contact.roomId}
                                    onClick={this.changeActiveTab}
                                    className={`room-item ${this.isActiveTab(contact.roomId) ? "active" : ""}`}
                                    >
                                        {contact.username}
                                    </li>
                                ))}
                                <li
                                id="new-contact"
                                className="new-room-item"
                                >
                                    Yeni arkadas ekle
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="home-main">
                        <div className="main-room-header">
                            <h2>{this.getHeader(all_rooms)}</h2>
                        </div>
                        {this.renderMainSide()}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;