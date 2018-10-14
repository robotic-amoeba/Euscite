import React from 'react';
import { Link } from 'react-router-dom';


function Footer(props) {
  return (
    <footer className="page-footer">
      <div className="linksNavbar">
        <a href="#"><Link to='/about'>About</Link></a>
        <span>|</span>
        <a href="#">Facebook</a>
        <span>|</span>
        <a href="#">Twitter</a>
        <span>|</span>
        <a href="#">Instagram</a>
      </div>
    </footer>
  )
}

export default Footer;
