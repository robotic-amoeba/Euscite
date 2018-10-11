import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navigation.scss'


function Footer(props) {
  return (
    <footer className="page-footer">
      <div className="linksNavbar">
        <a><Link to='/about'>About</Link></a>
        <span>|</span>
        <a>Share on: Facebook, Twitter, Instagram</a>
      </div>
    </footer>
  )
}

export default Footer;
