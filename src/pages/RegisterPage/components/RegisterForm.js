import React from 'react'
import './RegisterForm.css'
import {NavLink} from 'react-router-dom'
import SuccessPage from './SuccessPage'
import $ from 'jquery'

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
            },
            university_dropdown: {
                unilist: [],
                activeTab: -1
            }
        };

        this.universityInputRef = React.createRef()
        this.universityDropdownRef = React.createRef()
        this.signinCheckboxRef = React.createRef()

        // Bind functions to the component class
        this.checkEmailContent = this.checkEmailContent.bind(this)
        this.checkPasswordContent = this.checkPasswordContent.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
        this.validateUsernameAndUniversity = this.validateUsernameAndUniversity.bind(this)
        this.validateNameAndUsername = this.validateNameAndUsername.bind(this)
        this.universityDropdown = this.universityDropdown.bind(this)
        this.setUniversity = this.setUniversity.bind(this)
        this.changeActiveUniTab = this.changeActiveUniTab.bind(this)
        this.removeUniversityDropdown = this.removeUniversityDropdown.bind(this)
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

    validateNameAndUsername(e) {
        const name = $('input[name="name"]').val()
        const surname = $('input[name="surname"]').val()
        if (name === '') {
            this.setState({
                ...this.state,
                warning_messages: {
                    'name' : 'Bu alan zorunludur.'
                }
            })
            return false
        }
        else if (surname === '') {
            this.setState({
                ...this.state,
                warning_messages: {
                    'surname' : 'Bu alan zorunludur.'
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

    setUniversity(e) {
        /* Set the university input field accordingly if one of the options is selected. */
        e.preventDefault()
        $('input[name="university"]').val(e.target.text)
        // Close the list
        this.setState({
            ...this.state,
            university_dropdown: {
                unilist: [],
                activeTab: -1
            }
        })
        // Continue focusing on the input field
        $('input[name="university"]').focus()
    }

    removeUniversityDropdown(e) {
        this.setState({
            ...this.state,
            university_dropdown: {
                unilist: [],
                activeTab: -1
            }
        })
    }

    universityDropdown(e) {
        /*
        University dropdown menu based on user input.
        */
       
        const universityVal = $('input[name="university"]').val()
        
        if (universityVal === '') {
            this.removeUniversityDropdown()
            return
        }

        const universityList = [
            'Boğaziçi Üniversitesi',
            'Koç Üniversitesi',
            'Bilgi Üniversitesi',
        ]

        // Possible university suggestions based on user input
        const possibleUniversities = universityList.filter(university => {
            return university.substr(0, universityVal.length).toUpperCase() === universityVal.toUpperCase()
        })
        
        this.setState({
            ...this.state,
            university_dropdown: {
                unilist: possibleUniversities,
                activeTab: -1
            }
        })

    }
    
    changeActiveUniTab(e) {
        /* Change the active tab on the university dropdown list. */
        const universityInputField = document.getElementById('university-input')
        if (universityInputField.value === '') {
            return
        }
        const currentActiveTab = this.state.university_dropdown.activeTab
        const currentUniversityList = this.state.university_dropdown.unilist

        if (e.key === 'Enter') {
            if (this.state.university_dropdown.unilist.length ===  0) {
                return
            }
            // Do not submit the form because of the enter keypress lol
            e.preventDefault()
            const selectedUniversity = this.state.university_dropdown.unilist[this.state.university_dropdown.activeTab]
            // Set the value of the input field based on the selected university
            universityInputField.value = selectedUniversity
            this.removeUniversityDropdown()
            return
        }

        // Escape key
        if (e.keyCode === 27) {
            this.removeUniversityDropdown()
            return
        }

        // Update the active tab ID, based on whether up or down key is pressed
        // Up key
        let newActiveTab
        if (e.keyCode === 38) {
            if (currentActiveTab < 0) {
                return
            }
            newActiveTab = currentActiveTab - 1
        }
        // Down key
        else if (e.keyCode === 40) {
            newActiveTab = currentActiveTab + 1
        }

        // Update the state
        this.setState({
            ...this.state,
            university_dropdown: {
                unilist: currentUniversityList,
                activeTab: newActiveTab,
            }
        })
    }

    checkIfSigninCheckboxIsChecked(e) {
        /* Check if the sign-in checkbox (user agreement) is checked */
        const boxChecked = this.signinCheckboxRef.current.checked
        if (!boxChecked) {
            this.setState({
                ...this.state,
                warning_messages: {
                    'signinCheckbox' : 'Lütfen bu alanı doldurun.'
                }
            })
        }
        return boxChecked
    }

    onSubmit(e) {
        /* Handle form submission. */
        e.preventDefault();

        // Checks: Validate inputs
        const valid_form = this.validateEmail(e) && this.validatePassword(e) && this.validateUsernameAndUniversity(e) && this.validateNameAndUsername(e)
        if (!valid_form) {
            return
        }

        // Check that the user indeed checked the sign-in agreement checkbox
        if (!this.checkIfSigninCheckboxIsChecked(e)) {
            return
        }

        const ENDPOINT = '/api/users';
        
        const body = {
            name: $('input[name="name"]').val() + ' ' + $('input[name="surname"]').val(),
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
                            <div className="sign-in-name-surname-flex-container">
                                <div className="sign-in-name-flex-child">
                                    <label for="name">İsim</label>
                                    <input type="text" className="sign-in-name-field" placeholder="İsim" name="name"></input>
                                    <div className="warning-message">{this.state.warning_messages['name']}</div>
                                </div>
                                <div className="sign-in-dummy-flex-child"></div>
                                <div className="sign-in-surname-flex-child">
                                    <label for="surname">Soyisim </label>
                                    <input type="text" className="sign-in-surname-field" placeholder="Soyisim" name="surname"></input>
                                    <div className="warning-message">{this.state.warning_messages['surname']}</div>
                                </div>
                            </div>

                            <label for="username">E-posta Adresi</label>
                            <input type="text" placeholder="xxx@xxx.edu.tr" name="user-email" onChange={this.checkEmailContent}></input>
                            <div className="warning-message">{this.state.warning_messages['email']}</div>

                            <label for="username">Kullanıcı Adı</label>
                            <input type="text" placeholder="Kullanıcı adı" name="username" autoComplete="off"></input>
                            <div className="warning-message">{this.state.warning_messages['username']}</div>
        
                            <label for="password">Şifre</label>
                            <input type="password" placeholder="Şifre" name="password" onChange={this.checkPasswordContent}></input>
                            <div className="warning-message">{this.state.warning_messages['password']}</div>

                            <label for="university">Üniversite</label>
                            <input type="text" placeholder="Üniversite" name="university" id="university-input" autoComplete="off" onKeyDown={this.changeActiveUniTab} onChange={this.universityDropdown} ref={this.universityInputRef}></input>
                            <div className="university-dropdown-menu" ref={this.universityDropdownRef}>
                                {this.state.university_dropdown.unilist.map((university, index) => {
                                    if (index === this.state.university_dropdown.activeTab) {
                                        return <a onClick={this.setUniversity} className="university-suggestion-item university-item-active">{university}</a>
                                    }
                                    else {
                                        return <a onClick={this.setUniversity} className="university-suggestion-item">{university}</a>
                                    }
                                })}
                            </div>
                            <div className="warning-message">{this.state.warning_messages['university']}</div>
        
                            <div className="sign-in-checkbox-div">
                                <input type="checkbox" name="sign-in-checkbox" ref={this.signinCheckboxRef}/>
                                <label for="sign-in-checkbox" className="sign-in-checkbox-text"><a href="#">Kullanıcı sözleşmesini</a> okudum ve kabul ediyorum.</label>
                                <div className="warning-message">{this.state.warning_messages['signinCheckbox']}</div>
                            </div>

                            <button className="register" type="submit">Kaydol</button>
                        </form>
                    </div>
                </div>
                <div></div>
            </div>
        );
    }
}

export default RegisterForm;