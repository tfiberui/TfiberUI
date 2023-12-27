import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Header.scss'

function Header() {
	const [selected, setSelected] = useState(0);
  const handleOutsideClick = (e) => {
		if (e.target.classList.contains("sub-menu")) {
			setSelected("");
		}
	  };
   
  useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
	  }, [selected]);
     
	return (
		<header className="section header">
			<div className="container">
				<div className="text-tools-wrapper">
					<div className="text-tool1">
						<span className="letter-A1">A<sup>-</sup></span>
						<span className="letter-A2">A</span>
						<span className="letter-A3">A<sup>+</sup></span>
					</div>
					<div className="text-tool2">
						<span className="letter-E">English</span> | <span className="letter-T">తెలుగు</span>
					</div>
				</div>
				<div className="logo-nav-wrapper">
					{/* <img className="logo" src="/public/assets/logo.png" /> */}
          <Link to="/home"><img className="logo" src="/assets/logo.png" /></Link>
					<div className="nav-user-wrapper">
						<nav className="nav-wrapper">
							<ul>
								<li>
									<a href="" onClick={(e) => { e.preventDefault(); setSelected(!selected) }} className={selected ? 'selected' : ''}>Segments <span className="chevron bottom"></span></a>
									<ul className={selected ? 'sub-menu selected' : 'sub-menu'}>
										<li><Link to="/government">Government</Link></li>
										<li><Link to="/residential">Residential</Link></li>
										<li><Link to="/cell">Cell Tower</Link></li>
										<li><Link to="/enterprise">Enterprises</Link></li>
									</ul>
								</li>
								<li><Link to="/comingSoon">Service Partners</Link></li>
								<li><Link to="/about-us">About Us</Link></li>
								<li><Link to="/contact">Contact</Link></li>
								<li><a href="https://172.28.10.9:8443/CustomerPortal/" target="_blank">Register</a></li>
							</ul>
						</nav>
						{/* <img className="user" src="/public/assets/Group 80.jpg" /> */}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header;