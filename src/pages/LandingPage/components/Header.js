import React from 'react';
import './Header.css';
import {NavLink} from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div id="header">
                <h1 className="greeting">Merhaba!</h1>
                <p className="greeting">Kampuste Kal ile universitene her zaman ve her yerde bagli kal!</p>
                <div className="register-login-button-container">
                    <NavLink className="home-nav-item" to="/register">
                        <button className="header-button" id="signin">
                            Kaydol
                        </button>
                    </NavLink>
                    <NavLink className="home-nav-item" to="/login">
                        <button className="header-button" id="login-button">
                            Giris Yap
                        </button>
                    </NavLink>
                </div>
                <h3 id="hidden">Hidden</h3>
            </div>
        );
    }
}

export default Header;