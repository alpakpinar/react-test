import React from 'react';
import './LoginForm.css';
import {NavLink} from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginMessage: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    setUsername(username) {
        this.setState({username: username})
    }

    setPassword(password) {
        this.setState({password: password})
    }

    async loginUser(credentials) {
        return fetch('/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
    }

    async handleSubmit(e) {
        e.preventDefault();
        const response = await this.loginUser(this.state);
        if (response.message === 'logged-in') {
            this.props.setToken({
                token: response.token,
                username: response.username
            });
            // Reload page so that we get redirected
            window.location.reload();
        }
        else if (response.message === 'User not found') {
            this.setState({loginMessage: 'Kullanici bulunamadi!'});
        }
        else if (response.message === 'Wrong password') {
            this.setState({loginMessage: 'Yanlis sifre!'});
        }
        // In case of server error
        else {
            this.setState({loginMessage: 'Bir problem oldu!'});
        }
    }

    render() {
        return (
            <div>
                <div className="header-container">
                    <h1 className="register-title">Giris yap!</h1>
                    <p className="register-text">Merhaba, asagidaki alanlari doldurarak giris yapabilirsin.</p> 
                </div>
                <div className="form-container">
                    <div className="login-msg">
                        <p>{this.state.loginMessage}</p>
                    </div>
                    <form className="register-form" onSubmit={this.handleSubmit}>
                        <label for="username">Kullanici Adi</label>
                        <input type="text" 
                               placeholder="Kullanici adi" 
                               name="username" 
                               onChange={e => this.setUsername(e.target.value)}
                               required>
                               </input>
    
                        <label for="password">Sifre</label>
                        <input type="password" 
                               placeholder="Sifre" 
                               name="password"
                               onChange={e => this.setPassword(e.target.value)} 
                               required>
                               </input>
    
                        <button className="register" type="submit">Giris Yap</button>
                    </form>
                </div>
                <div className="back-to-home">
                    <p>Ana sayfaya geri donmek icin <NavLink className="back-to-home-button" to="/">buraya</NavLink> tiklayabilirsin.</p>
                </div>

            </div>
        );
    }
}

export default LoginForm;