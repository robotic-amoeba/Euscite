import React from 'react';
import { Link } from 'react-router-dom';
import facebook from '../../images/Facebook.png'
import twitter from '../../images/Twitter.png'
import linkedin from '../../images/LinkedIn.png'


function Footer(props) {
  return (
    <footer className="page-footer">
      <div className="linksNavbar">
        <Link to='/about'>About</Link>
        <span>|</span>
        <img src={facebook} alt=""/>
        <a href="/">Facebook</a>
        <span>|</span>
        <img src={twitter} alt=""/>
        <a href="/">Twitter</a>
        <span>|</span>
        <img src={linkedin} alt=""/>
        <a href="/">LinkedIn</a>

      </div>
    </footer>
  )
}

export default Footer;
