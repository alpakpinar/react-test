import React from 'react';
import './Description.css';

class Description extends React.Component {

    render() {
        return (
            <div id="description">
                <div id="sectionOne">
                    <h2 className="sectionOne-title">Herkes icin yeni bir universite platformu</h2>
                    <p className="desc">Kampuste Kal ile universiteden istedigin kisilerle iletisim kurabilir, 
                    istedigin kisilerle bilgi paylasabilirsin.</p>
                </div>
                <div id="imageOne">
                    <img alt="" id="img1" src="Bosphorus_University.jpg"></img>
                </div>
                <div id="sectionTwo">
                    <h2 className="sectionTwo-title">Konusma Gruplarina Katil</h2>
                    <p className="desc">Ilgini ceken konusma gruplarina istek yolla ve kolayca katil.
                    Guvenli bir sekilde konusma odalarinda universitenden insanlarla iletisim kur.</p>
                </div>
            </div>
        );  
    }

}

export default Description;