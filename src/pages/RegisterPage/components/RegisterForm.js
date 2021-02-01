import React from 'react';
import './RegisterForm.css';
import {NavLink} from 'react-router-dom';
import SuccessPage from './SuccessPage';
import $ from 'jquery';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            success: false, // If user successfully signs in, redirect to the success page
            username: '', 
            signin_msg: '',
            warning_messages: {
                'email' : '',
                'password' : '',
                'username' : '',
                'university' : '',
            }
        };

        this.checkEmailContent = this.checkEmailContent.bind(this)
        this.checkPasswordContent = this.checkPasswordContent.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
        this.validateUsernameAndUniversity = this.validateUsernameAndUniversity.bind(this)
    }

    validateUsernameAndUniversity(e) {
        const username = $('input[name="username"]').val()
        const university = $('input[name="university"]').val()
        if (username === '') {
            this.setState({
                ...this.state,
                warning_messages: {
                    'username' : 'Bu alan zorunludur.'
                }
            })
            return false
        }
        else if (university === '') {
            this.setState({
                ...this.state,
                warning_messages: {
                    'university' : 'Bu alan zorunludur.'
                }
            })
            return false
        }
        return true
    }


    checkEmailContent(e) {
        /*
        If there is an existing warning message, and user enters a valid e-mail,
        check the content and remove the warning message.
        */
        // Check for existing warning message
        if (this.state.warning_messages['email'] === '') {
            return
        }

        const email = $('input[name="user-email"]').val();
        // Valid e-mail?
        if (email.endsWith('edu.tr') && email.includes('@')) {
            this.setState({
                ...this.state,
                warning_messages: {
                    'email' : ''
                }
            })
        }
    }

    validateEmail(e) {
        /*
        Validate input e-mail: Should have the following format
        --> xxx@xxx.edu.tr
        */
        e.preventDefault()
        const email = $('input[name="user-email"]').val()
        if (!(email.endsWith('edu.tr') && email.includes('@'))) {
            this.setState({
                ...this.state,
                warning_messages: {
                    'email' : 'Lütfen geçerli bir e-mail adresi girin.'
                }
            })
            return false
        }
        return true
    }

    checkPasswordContent(e) {
        /*
        Remove irrelevant warning message.
        */
        const password = $('input[name="password"]').val()
        if (password.length >= 6) {
            this.setState({
                ...this.state,
                warning_messages: {
                    'password' : ''
                }
            })
        }
    }
    validatePassword(e) {
        /*
        Validate password: Should have at least 6 characters
        */
        e.preventDefault()
        const password = $('input[name="password"]').val()
        if (password.length < 6) {
            this.setState({
                ...this.state,
                warning_messages: {
                    'password' : 'Şifre en az 6 karakterden oluşmalıdır.'
                }
            })
            return false
        }
        return true
    }

    onSubmit(e) {
        /* Handle form submission. */
        e.preventDefault();

        // Checks: Validate inputs
        const valid_form = this.validateEmail(e) && this.validatePassword(e) && this.validateUsernameAndUniversity(e)
        if (!valid_form) {
            return
        }

        const ENDPOINT = '/api/users';
        
        const body = {
            email: $('input[name="user-email"]').val(),
            username: $('input[name="username"]').val(),
            password: $('input[name="password"]').val(),
            university: $('input[name="university"]').val(),
        };

        fetch(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'appplication/json'
            }
        })
        .then(async response => {
            let msg = null;
            if (response.status === 201) {
                const jsonResponse = await response.json();
                msg = `Hesabin olusturuldu ${jsonResponse.username}!`;
                this.setState({
                    ...this.state,
                    success: true,
                    username: jsonResponse.username
                })
            }
            else if (response.status === 400) {
                msg = `Maalesef ${body.username} ismi alinmis, baska bir isim lazim!`;
            }
            else {
                msg = 'Bir problem oldu!';
            }
            this.setState({signin_msg: msg});
            
        });
    }

    render() {
        // If succesful sign in occurs, show this page
        if (this.state.success) {
            return <SuccessPage username={this.state.username}/>
        }
        return (
            <div className="sign-in-main-container">
                <div className="sign-in-container">
                    <div className="header-container">
                        <h1 className="register-title">Kaydol!</h1>
                        <p className="register-text">Merhaba, aşağıdaki alanları doldurarak kaydolabilirsin.</p> 
                    </div>
                    <div className="register-form-container">
                        <div className="msg-div">
                            <p className="success-text">{this.state.signin_msg}</p>
                        </div>
                        <form className="register-form" onSubmit={this.onSubmit}>
                            <label for="username">E-posta Adresi</label>
                            <input type="text" placeholder="xxx@xxx.edu.tr" name="user-email" onChange={this.checkEmailContent}></input>
                            <div className="warning-message">{this.state.warning_messages['email']}</div>

                            <label for="username">Kullanıcı Adı</label>
                            <input type="text" placeholder="Kullanıcı adı" name="username"></input>
                            <div className="warning-message">{this.state.warning_messages['username']}</div>
        
                            <label for="password">Şifre</label>
                            <input type="password" placeholder="Şifre" name="password" onChange={this.checkPasswordContent}></input>
                            <div className="warning-message">{this.state.warning_messages['password']}</div>

                            <label for="university">Üniversite</label>
                            <input type="text" placeholder="Üniversite" name="university"></input>
                            <div className="warning-message">{this.state.warning_messages['university']}</div>
        
                            <button className="register" type="submit">Kaydol</button>
                        </form>
                    </div>
                    <div className="back-to-home">
                        <p>Ana sayfaya geri dönmek için <NavLink className="back-to-home-button" to="/">buraya</NavLink> tıklayabilirsin.</p>
                    </div>
                </div>
                <div></div>
            </div>
        );
    }
}

export default RegisterForm;