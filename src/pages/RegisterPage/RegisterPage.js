import React from 'react';
import RegisterForm from './components/RegisterForm';
import Footer from '../LandingPage/components/Footer';

/*
Register page.
*/

class RegisterPage extends React.Component {

    render() {
        return (
            <div>
                <RegisterForm />
                <Footer />
            </div>
        );
    }
}

export default RegisterPage;