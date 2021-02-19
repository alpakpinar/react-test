import React from 'react'
import './LoginForm.css'
import {NavLink} from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const styles = {
    textfields: {
        width: "100%",
        margin: "10px 0"
    },
    buttons: {
        backgroundColor: "#6495ED",
        textTransform: "none",
        marginTop: "10px",
        width: "120px"
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginMessage: '',
            saveToLocalStorage: false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setUsername(username) {
        this.setState({username: username})
    }

    setPassword(password) {
        this.setState({password: password})
    }
    
    saveTokenToLocalStorage(token) {
        /* To be used when user checks the "remember me" box */
        localStorage.setItem('token', JSON.stringify(token))
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
        const response = await this.loginUser({
            username: this.state.username,
            password: this.state.password
        });
        if (response.message === 'logged-in') {
            const userToken = {
                token: response.token,
                username: response.username
            } 
            this.props.setToken(userToken)
            // If "remember me" box is checked, save the token into the local storage as well so that it will be kept there
            if (this.state.saveToLocalStorage) {
                this.saveTokenToLocalStorage(userToken)
            }

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
                        {/* <label>Kullanici Adi</label>
                        <input type="text" 
                               placeholder="Kullanici adi" 
                               name="username" 
                               onChange={e => this.setUsername(e.target.value)}
                               required>
                               </input> */}
                        <TextField id="login-text-field" label="Kullanıcı adı" style={styles.textfields}></TextField>
                        <TextField id="login-text-field" label="Şifre" style={styles.textfields}></TextField>
    
                        <Button color="primary" variant="contained" style={styles.buttons}>Giriş Yap</Button>

                        <button className="register" type="submit">Giris Yap</button>
                        {/* <Button variant="contained" color="primary" className="login-button">Giriş Yap</Button> */}
                    </form>
                    <div className="remember-me-checkbox-div">
                        <Checkbox color="primary" onChange={e => this.setState({saveToLocalStorage: !this.state.saveToLocalStorage})}></Checkbox>
                        {/* <input className="remember-me-checkbox" type="checkbox" onChange={e => this.setState({saveToLocalStorage: !this.state.saveToLocalStorage})}></input> */}
                        <label>Beni hatirla</label>
                    </div>
                </div>
                <div className="back-to-home">
                    <p>Ana sayfaya geri donmek icin <NavLink className="back-to-home-button" to="/">buraya</NavLink> tiklayabilirsin.</p>
                </div>

            </div>
        );
    }
}

export default LoginForm;