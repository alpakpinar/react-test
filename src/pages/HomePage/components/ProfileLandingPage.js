import React from 'react'
import './ProfileLandingPage.css'

// TODO: Actual search functionality
// (Probably) more aesthetics

class ProfileLandingPage extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // Search and load the group list
    }
    render() {
        return (
            <div>
                <div className="search-bar-container">
                    <h1>Topluluk keşfet</h1>
                    <input className="profile-landing-page-search-bar" placeholder="Topluluk ara" />
                    <br></br>
                    <button type="submit" className="profile-landing-page-search-button">Ara</button>
                </div>
            </div>
        )
    }
}

export default ProfileLandingPage