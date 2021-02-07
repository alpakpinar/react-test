import React from 'react'
import RegisterForm from './components/RegisterForm'
import RegisterPageContent from './components/RegisterPageContent'
import Footer from '../LandingPage/components/Footer'
import Navigation from '../LandingPage/components/Navigation'
import './RegisterPage.css'

/*
Register page.
*/

class RegisterPage extends React.Component {

    render() {
        return (
            <div>
                <Navigation />
                <div className="flex-container">
                    <div className="register-form-div">
                        <RegisterForm />
                    </div>
                    <div className="register-page-content-container">
                        <RegisterPageContent />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default RegisterPage;