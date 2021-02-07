import React from 'react'
import {Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Footer from '../LandingPage/components/Footer'
import Navigation from '../LandingPage/components/Navigation'

class LoginPage extends React.Component {
    render() {
        return (
            <div>
                {this.props.getToken() ? 
                <Redirect to="/home" /> :
                <div>
                    <Navigation />
                    <LoginForm setToken={this.props.setToken} />
                    <Footer />
                </div> 
                }
            </div>
        );
    }
}

export default LoginPage;