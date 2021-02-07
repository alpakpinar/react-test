import React from 'react'
import './RegisterPageContent.css'

class RegisterPageContent extends React.Component {
    render() {
        return (
            <div>
                <div className="register-page-content-div">
                    <ul className="register-page-content-itemlist">
                        <li className="register-page-content-item item-left">Sadece üniversiteler var</li>
                        <li className="register-page-content-item item-right">Sadece edu.tr maili yeter</li>
                        <li className="register-page-content-item item-left">Üniversiteler icin filtrelenmiş alan</li>
                        <li className="register-page-content-item item-right">Ünivesitelere özel faydalar</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default RegisterPageContent