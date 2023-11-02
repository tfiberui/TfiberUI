import React from "react";
import './Footer.scss';

function Footer(){
    return(
        <footer className="section footer">
            <div className="container footer-wrapper">                
                <div className="logo-social">
                    <div className="footer-logo">
                        <img src="/public/assets/t-fiber_white 1.png"/>                        
                    </div>
                    <div className="social-icon">
                        <img src="/public/assets/Ellipse 212.png"/>
                        <img src="/public/assets/Ellipse 213.png"/>
                        <img src="/public/assets/Ellipse 214.png"/>
                        <img src="/public/assets/Ellipse 215.png"/>
                    </div>
                </div>
                <div className="footer-nav-main">
                    <nav className="footer-nav-wrapper">
                        <ul className="footer-nav1">
                            <li><a href="">Sitemap</a></li>
                            <li><a href="/terms">Terms of use</a></li>
                            <li><a href="">Privacy Policy</a></li>
                            <li><a href="/downloads">Downloads</a></li>
                            <li><a href="/gallery">Gallery</a></li>                          
                        </ul>
                    </nav>
                    <nav className="footer-nav-wrapper">
                        <ul className="footer-nav2">
                            <li><a href="">Contact</a></li>
                            <li><a href="">About Us</a></li>
                            <li><a href="">Organization</a></li>
                            <li><a href="/documents">Documents</a></li>
                            <li><a href="/circulars">Circulars and Notices</a></li>                             
                        </ul>
                    </nav>
                    <nav className="footer-nav-wrapper">
                        <ul className="footer-nav3">
                            <li><a href="">Career</a></li>
                            <li><a href="">FAQ</a></li>
                            <li><a href="">Feedback</a></li>
                            <li><a href="">Press Release</a></li>                               
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
