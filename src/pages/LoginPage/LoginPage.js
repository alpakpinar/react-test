import React from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Footer from '../LandingPage/components/Footer';

class LoginPage extends React.Component {
    render() {
        return (
            <div>
                {this.props.getToken() ? 
                <Redirect to="/home" /> :
                <div>
                    <LoginForm setToken={this.props.setToken} />
                    <Footer />
                </div> 
                }
            </div>
        );
    }
}

export default LoginPage;