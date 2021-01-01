import React from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import Description from './components/Description';
import './LandingPage.css';

class Home extends React.Component {
  
  render() {
    return (
      <div>
        <Navigation />
        <Header />
        <Description />
        <Footer />
      </div>
    )
  }
}

export default Home;
