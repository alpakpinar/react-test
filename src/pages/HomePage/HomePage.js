import React from 'react'
import {Redirect} from 'react-router-dom';
import './HomePage.css'

import Navigation from '../LandingPage/components/Navigation'
import ChatRoom from './components/ChatRoom'
import NewChatGroupForm from './components/NewChatGroupForm'
import ProfileLandingPage from './components/ProfileLandingPage'
import UsernameContainer from './components/UsernameContainer'
import SettingsMenu from './components/SettingsMenu'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChatIcon from '@material-ui/icons/Chat'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import ContactsIcon from '@material-ui/icons/Contacts'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import CreateIcon from '@material-ui/icons/Create'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import PersonIcon from '@material-ui/icons/Person'
import AddAlertIcon from '@material-ui/icons/AddAlert'

class NestedList extends React.Component {
    /* Reusable nested/collapsable list for left-hand side navigation bar. */
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.renderIcon = this.renderIcon.bind(this)
    }

    handleClick(e) {
        // Get the parent div element, and extract the ID from it
        const parent = e.target.parentElement
        this.props.setActiveTab(parent.id)
    }

    renderIcon() {
        if (this.props.type === 'chatroom') {
            return <QuestionAnswerIcon></QuestionAnswerIcon>
        }
        else if (this.props.type === 'contact') {
            return <PersonIcon></PersonIcon>
        }
        else if (this.props.type === 'announcement') {
            return <AddAlertIcon></AddAlertIcon>
        }
     }

    render() {
        return (
            <Collapse in={this.props.show}>
                <List component="div">
                    {this.props.items.map(item => {
                        return (
                            <div id={item.roomId}>
                                <ListItem button selected={item.roomId === this.props.activeTabId} style={{"padding-left": "35px"}} onClick={this.handleClick}>
                                    <ListItemIcon>{this.renderIcon()}</ListItemIcon>
                                    <ListItemText id={item.roomId} primary={this.props.type === 'contact' ? item.username : item.name} />
                                </ListItem>
                            </div>
                        )
                    })}
                </List>
            </Collapse>
        )
    }
}

class LeftNavigation extends React.Component {
    /* Navigation on the left hand side of the user page. */
    constructor(props) {
        super(props)
        this.state = {
            activeTabId: -1,
            nests: {
                chatroomsOpen: true,
                announcementsOpen: true,
                contactsOpen: true,
            }
        }
    
        this.handleClickChatrooms = this.handleClickChatrooms.bind(this)
        this.handleClickAnnouncements = this.handleClickAnnouncements.bind(this)
        this.handleClickContacts = this.handleClickContacts.bind(this)
        this.setActiveTab = this.setActiveTab.bind(this)
        this.handleClickNewGroup = this.handleClickNewGroup.bind(this)
        this.handleClickGroupSearch = this.handleClickGroupSearch.bind(this)

    }

    setActiveTab(selectedTabId) {
        this.setState({
            ...this.state,
            activeTabId: selectedTabId
        })
    }

    handleClickChatrooms() {
        this.setState({
            ...this.state,
            nests: {
                chatroomsOpen: !this.state.nests.chatroomsOpen,
                announcementsOpen: this.state.nests.announcementsOpen,
                contactsOpen: this.state.nests.contactsOpen
            }
        })
    }

    handleClickAnnouncements() {
        this.setState({
            ...this.state,
            nests: {
                chatroomsOpen: this.state.nests.chatroomsOpen,
                announcementsOpen: !this.state.nests.announcementsOpen,
                contactsOpen: this.state.nests.contactsOpen
            }
        })
    }

    handleClickContacts() {
        this.setState({
            ...this.state,
            nests: {
                chatroomsOpen: this.state.nests.chatroomsOpen,
                announcementsOpen: this.state.nests.announcementsOpen,
                contactsOpen: !this.state.nests.contactsOpen
            }
        })
    }

    handleClickNewGroup() {
        const id = "new-group-form"
        this.props.setActiveTab(id)
        this.setState({
            ...this.state,
            activeTabId: id
        })
    }

    handleClickGroupSearch() {
        const id = "group-search"
        this.props.setActiveTab(id)
        this.setState({
            ...this.state,
            activeTabId: id
        })
    }

    render() {
        return (
            <div>
                <List component="nav">
                    <ListItem button onClick={this.handleClickChatrooms}>
                        <ListItemIcon>
                            <ChatIcon></ChatIcon>
                        </ListItemIcon>
                        <ListItemText primary="Chat Odaları" />
                        {this.state.nests.chatroomsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <NestedList show={this.state.nests.chatroomsOpen} items={this.props.chatrooms} type="chatroom" setActiveTab={this.props.setActiveTab} activeTabId={this.props.activeTabId} /> 
                    <ListItem button onClick={this.handleClickAnnouncements}>
                        <ListItemIcon>
                            <AnnouncementIcon></AnnouncementIcon>
                        </ListItemIcon>
                        <ListItemText primary="Anonslar" />
                        {this.state.nests.announcementsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <NestedList show={this.state.nests.announcementsOpen} items={this.props.announcement_rooms} type="announcement" setActiveTab={this.props.setActiveTab} /> 
                    <ListItem button onClick={this.handleClickContacts}>
                        <ListItemIcon>
                            <ContactsIcon></ContactsIcon>
                        </ListItemIcon>
                        <ListItemText primary="Arkadaşlar" />
                        {this.state.nests.contactsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <NestedList show={this.state.nests.contactsOpen} items={this.props.contacts} type="contact" setActiveTab={this.props.setActiveTab} /> 
                    <Divider />
                    <ListItem button onClick={this.handleClickGroupSearch} selected={this.state.activeTabId === "group-search"}>
                        <ListItemIcon>
                            <SearchIcon></SearchIcon>
                        </ListItemIcon>
                        <ListItemText primary="Keşfet" />
                    </ListItem>
                    <ListItem button onClick={this.handleClickNewGroup} selected={this.state.activeTabId === "new-group-form"} >
                        <ListItemIcon>
                            <CreateIcon></CreateIcon>
                        </ListItemIcon>
                        <ListItemText primary="Yeni Grup Oluştur" />
                    </ListItem>
                    <ListItem button onClick={null}>
                        <ListItemIcon>
                            <AddIcon></AddIcon>
                        </ListItemIcon>
                        <ListItemText primary="Yeni Arkadaş Ekle" />
                    </ListItem>
                </List>
            </div>
        )
    }
}

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
            name: '',
            chat_rooms: [], // Initially empty, to be fetched from the database and updated as page loads
            contacts: [], // Initially empty, to be fetched from the database and updated as page loads
            announcement_rooms: [
                {roomId: "a-room-1", name: "# Staj", type: "announcement"},
                {roomId: "a-room-2", name: "# Ev/Yurt", type: "announcement"},

            ],
            activeTabId: 'group-search',
        };
        this.isActiveTab = this.isActiveTab.bind(this)
        this.setActiveTab = this.setActiveTab.bind(this)
        this.renderMainSide = this.renderMainSide.bind(this)
        this.handleExitGroup = this.handleExitGroup.bind(this)
        this.userLoggedIn = this.userLoggedIn.bind(this)
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

    setActiveTab(tabid) {
        this.setState({activeTabId: tabid});
    }

    showSettingsDropdown(e) {
        e.preventDefault()
        document.getElementById('dropdown-menu').classList.toggle('dropdown-show')
    }

    getHeader(all_rooms) {
        /* Get the appropriate header for the room we're displaying on the right hand side of the main screen */
        let header = null;
        if (this.state.activeTabId === '' || this.state.activeTabId === 'group-search') {
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
                contacts: jsonResponse.contacts,
                name: jsonResponse.name ? jsonResponse.name : ''
            })
        })

        // Event listener to close dropdown menu in case user clicks somewhere random
        if (this.userLoggedIn()) {
            document.addEventListener('click', this.closeDropdownOnClick)
        }
    }

    closeDropdownOnClick(e) {
        /* 
        If the dropdown menu is open and user clicks outside the dropdown button to close it,
        handle the situation and close the dropdown menu.
        */
        if (!e.target.matches('.settings-dropdown-btn')) {
            const dropdown_menu = document.getElementById('dropdown-menu')
            if (!dropdown_menu) {
                return
            }
            if (dropdown_menu.classList.contains('dropdown-show')) {
                dropdown_menu.classList.remove('dropdown-show')
            }
        }
    }

    renderMainSide() {
        /* Render main (central) side of the home page depending on the tab being selected. */
        const activeTabId = this.state.activeTabId;
        // Empty page if no tab is selected (initial default)
        if (activeTabId === 'group-search') {
            return <ProfileLandingPage />
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
                        <UsernameContainer username={this.state.username} name={this.state.name} />
                        <LeftNavigation 
                            chatrooms={this.state.chat_rooms} 
                            announcement_rooms={this.state.announcement_rooms} 
                            contacts={this.state.contacts} 
                            setActiveTab={this.setActiveTab} 
                            activeTabId={this.state.activeTabId}
                            />
                    </div>
                    <div className="home-main">  
                        <div className="main-room-header">
                            <h2>{this.getHeader(all_rooms)}</h2>
                            <SettingsMenu />
                        </div>
                        {this.renderMainSide()}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;