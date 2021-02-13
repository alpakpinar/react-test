import React from 'react'
import './ProfileLandingPage.css'
// import Input from '@material-ui/core/Input'
// import TextField from '@material-ui/core/TextField'

// TODO: Actual search functionality
// (Probably) more aesthetics

class ProfileLandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'chatrooms' : [],
            'dropdown' : {
                'chatroomlist' : [],
                'activeTabId'  : -1
            }
        }

        // References
        this.searchbar = React.createRef()

        this.chatRoomDropdown = this.chatRoomDropdown.bind(this)
        this.removeChatRoomDropdown = this.removeChatRoomDropdown.bind(this)
        this.setChatRoom = this.setChatRoom.bind(this)
        this.changeActiveChatRoomOnKeystreak = this.changeActiveChatRoomOnKeystreak.bind(this)

    }
    componentDidMount() {
        // Search and load the group list
        fetch('/api/chatrooms', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            this.setState({
                ...this.state,
                'chatrooms' : jsonResponse
            })
        })
    }

    chatRoomDropdown() {
        /* Chat room dropdown based on the user input in the search field. */
        const currentVal = this.searchbar.current.value
        
        if (currentVal === '') {
            this.removeChatRoomDropdown()
            return
        }

        // Possible chatroom suggestions based on user input
        const possibleChatrooms = this.state.chatrooms.filter(chatroom => {
            return chatroom.name.substr(0, currentVal.length).toUpperCase() === currentVal.toUpperCase()
        })

        this.setState({
            ...this.state,
            'dropdown' : {
                'chatroomlist' : possibleChatrooms,
                'activeTabId' : -1
            }
        })
    }

    removeChatRoomDropdown() {
        this.setState({
            ...this.state,
            'dropdown' : {
                'chatroomlist' : [],
                'activeTabId' : -1
            }
        })
    }

    setChatRoom(e) {
        e.preventDefault()
        this.searchbar.current.value = e.target.text
        // Close the dropdown
        this.removeChatRoomDropdown()
        this.searchbar.current.focus()
    }

    changeActiveChatRoomOnKeystreak(e) {
        const chatroomInputField = this.searchbar.current.value
        if (chatroomInputField === '') {
            return
        }
        const currentActiveTab = this.state.dropdown.activeTabId
        const currentChatroomList = this.state.dropdown.chatroomlist

        if (e.key === 'Enter') {
            if (currentChatroomList.length ===  0) {
                return
            }
            // Do not submit the form because of the enter keypress lol
            e.preventDefault()
            const selectedChatroom = currentChatroomList[currentActiveTab]
            this.searchbar.current.value = selectedChatroom.name
            this.removeChatRoomDropdown()
            return
        }

        // Escape key
        if (e.keyCode === 27) {
            this.removeChatRoomDropdown()
            return
        }
        // Update the active tab ID, based on whether up or down key is pressed
        // Up key
        let newActiveTab
        if (e.keyCode === 38) {
            if (currentActiveTab < 0) {
                return
            }
            newActiveTab = currentActiveTab - 1
        }
        // Down key
        else if (e.keyCode === 40) {
            newActiveTab = currentActiveTab + 1
        }

        // Update the state
        this.setState({
            ...this.state,
            dropdown: {
                chatroomlist: currentChatroomList,
                activeTabId: newActiveTab
            }
        })
    }

    render() {
        return (
            <div>
                <div className="search-bar-container">
                    <h1>Topluluk keşfet</h1>
                    <input className="profile-landing-page-search-bar" placeholder="Topluluk ara" ref={this.searchbar} onChange={this.chatRoomDropdown} onKeyDown={this.changeActiveChatRoomOnKeystreak} />
                    <div className="chatroom-dropdown-menu">
                        {this.state.dropdown.chatroomlist.map((chatroom, index) => {
                            if (index === this.state.dropdown.activeTabId) {
                                return <a onClick={this.setChatRoom} className="chatroom-suggestion-item chatroom-item-active">{chatroom.name}</a>
                            }
                            else {
                                return <a onClick={this.setChatRoom} className="chatroom-suggestion-item">{chatroom.name}</a>
                            }
                        })}
                    </div>
                    <br></br>
                    <button type="submit" className="profile-landing-page-search-button">Ara</button>
                </div>
            </div>
        )
    }
}

export default ProfileLandingPage