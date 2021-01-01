import React from 'react';
import './RegisterForm.css';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            signin_msg: ''
        };
    }

    onSubmit(e) {
        /* Handle form submission. */
        e.preventDefault();
        const ENDPOINT = '/api/users';
        
        const body = {
            username: $('input[name="username"]').val(),
            password: $('input[name="password"]').val()
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
        return (
            <div>
                <div className="header-container">
                    <h1 className="register-title">Kaydol!</h1>
                    <p className="register-text">Merhaba, asagidaki alanlari doldurarak kaydolabilirsin.</p> 
                </div>
                <div className="form-container">
                    <div className="msg-div">
                        <p className="success-text">{this.state.signin_msg}</p>
                    </div>
                    <form className="register-form" onSubmit={this.onSubmit}>
                        <label for="username">Kullanici Adi</label>
                        <input type="text" placeholder="Kullanici adi" name="username" required></input>
    
                        <label for="password">Sifre</label>
                        <input type="password" placeholder="Sifre" name="password" required></input>
    
                        <button className="register" type="submit">Kaydol</button>
                    </form>
                </div>
                <div className="back-to-home">
                    <p>Ana sayfaya geri donmek icin <NavLink className="back-to-home-button" to="/">buraya</NavLink> tiklayabilirsin.</p>
                </div>
            </div>
        );
    }
}

export default RegisterForm;