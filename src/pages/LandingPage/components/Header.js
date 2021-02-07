import React from 'react';
import './Header.css';
import {NavLink} from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div id="header">
                <h1 className="greeting">Merhaba!</h1>
                <p className="greeting">Kampüste Kal ile üniversitene her zaman ve her yerde bağlı kal!</p>
                <div className="register-login-button-container">
                    <NavLink className="home-nav-item" to="/register">
                        <button className="header-button" id="signin">
                            Kaydol
                        </button>
                    </NavLink>
                    <NavLink className="home-nav-item" to="/login">
                        <button className="header-button" id="login-button">
                            Giriş Yap
                        </button>
                    </NavLink>
                </div>
                <h3 id="hidden">Hidden</h3>
            </div>
        );
    }
}

export default Header;