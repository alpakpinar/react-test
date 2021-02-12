import React from 'react'
import './ProfileLandingPage.css'

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

    render() {
        return (
            <div>
                <div className="search-bar-container">
                    <h1>Topluluk keşfet</h1>
                    <input className="profile-landing-page-search-bar" placeholder="Topluluk ara" ref={this.searchbar} onChange={this.chatRoomDropdown} />
                    <div className="chatroom-dropdown-menu">
                        {this.state.dropdown.chatroomlist.map((chatroom, index) => {
                            if (index === this.state.dropdown.activeTabId) {
                                return <a className="chatroom-suggestion-item chatroom-item-active">{chatroom.name}</a>
                            }
                            else {
                                return <a className="chatroom-suggestion-item">{chatroom.name}</a>
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