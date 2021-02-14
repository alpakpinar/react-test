import React from 'react'
import './RightSidebar.css'

import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'


class RightSidebar extends React.Component {
    constructor(props) {
        super(props)

        this.renderContacts = this.renderContacts.bind(this)
    }

    renderContacts() {
        return this.props.contacts.map(contact => {
            const username = contact.username
            return (
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <Avatar>{username[0].toUpperCase()}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={username}/>
                    </ListItem>
                </List>
            )
        })
    }

    render() {
        return (
            <div className="right-sidebar-container">
                <div className="right-sidebar-header-container">
                    <h2 className="right-sidebar-header">Kullanıcılar</h2>
                </div>
                <div className="right-sidebar-contact-list">{this.renderContacts()}</div>
            </div>
        )
    }
}

export default RightSidebar