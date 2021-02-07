import React from 'react';
import RegisterForm from './components/RegisterForm';
import Footer from '../LandingPage/components/Footer';
import './RegisterPage.css';

/*
Register page.
*/

class RegisterPage extends React.Component {

    render() {
        return (
            <div>
                <div className="flex-container">
                    <div className="register-form-div">
                        <RegisterForm />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default RegisterPage;