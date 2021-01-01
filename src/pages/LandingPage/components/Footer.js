import React from 'react';
import './Footer.css';

class Footer extends React.Component {

    render() {
        return (
            <div>
                <footer id="footer-div">
                    <ul className="footer-items">
                        <li><a href="/">Kampuste Kal</a></li>
                        <li><a href="/">Podcastler</a></li>
                        <li><a href="/">Bloglar</a></li>
                        <li><a href="/">Iletisim</a></li>
                    </ul>
                </footer>
            </div>
        );
    }
}

export default Footer;