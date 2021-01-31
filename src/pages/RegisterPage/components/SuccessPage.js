import React from 'react'
import {NavLink} from 'react-router-dom'
import './SuccessPage.css'

class SuccessPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="success-msg-container">
                    <p className="success-msg">
                        Hesabın oluşturuldu {this.props.username}!
                    </p>
                    <p className="redirect-msg">
                        Giriş yapmak için <NavLink to="/login" className="login-link">buraya</NavLink> tıklayabilirsin.
                    </p>
                </div>
            </div>
        )
    }
}

export default SuccessPage