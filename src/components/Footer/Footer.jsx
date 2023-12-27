import React from "react";
import { Link } from "react-router-dom";
import './Footer.scss';

function Footer(){
    return(
        <footer className="section footer">
            <div className="container footer-wrapper">                
                <div className="logo-social">
                    <div className="footer-logo">
                        <Link to='/home'><img src="/assets/t-fiber_white 1.png"/></Link>                       
                    </div>
                    <div className="social-icon">
                        <img src="/assets/Ellipse 212.png"/>
                        <img src="/assets/Ellipse 213.png"/>
                        <img src="/assets/Ellipse 214.png"/>
                        <img src="/assets/Ellipse 215.png"/>
                    </div>
                </div>
                <div className="footer-nav-main">
                    <nav className="footer-nav-wrapper">
                        <ul className="footer-nav1">
                            <li><Link to='/comingSoon'>Sitemap</Link></li>
                            <li><Link to='/terms'>Terms of use</Link></li>
                            <li><Link to='/comingSoon'>Privacy Policy</Link></li>
                            <li><Link to='/comingSoon'>Downloads</Link></li>
                            <li><Link to='/gallery'>Gallery</Link></li>                          
                        </ul>
                    </nav>
                    <nav className="footer-nav-wrapper">
                        <ul className="footer-nav2">
                            <li><Link to='/contact'>Contact</Link></li>
                            <li><Link to='/about-us'>About Us</Link></li>
                            <li><Link to='/comingSoon'>Organization</Link></li>
                            <li><Link to='/documents'>Documents</Link></li>
                            <li><Link to='/circulars'>Circulars and Notices</Link></li>                             
                        </ul>
                    </nav>
                    <nav className="footer-nav-wrapper">
                        <ul className="footer-nav3">
                            <li><Link to='/comingSoon'>Career</Link></li>
                            <li><Link to='/faq'>FAQ</Link></li>
                            <li><Link to='/feedback'>Feedback</Link></li>
                            <li><Link to='/press'>Press Release</Link></li>                               
                        </ul>
                    </nav>
                </div>              
            </div>
            <div className="section copyright">
                <div className="container">
                    <p>copyright details</p>
                </div>
            </div>           
        </footer>
    )
}

export default Footer;
