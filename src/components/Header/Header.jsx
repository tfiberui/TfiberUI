import React, { useState } from "react"
import { Link } from "react-router-dom";
import './Header.scss'

function Header() {
	const [selected, setSelected] = useState(0);

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
					<Link to="/home"><img className="logo" src="/public/assets/logo.png" /></Link>
					<div className="nav-user-wrapper">
						<nav className="nav-wrapper">
							<ul>
								<li>
									<a href="" onClick={(e) => { e.preventDefault(); setSelected(!selected) }} className={selected ? 'selected' : ''}>Segments <span className="chevron bottom"></span></a>
									<ul className={selected ? 'sub-menu selected' : 'sub-menu'}>
									<li><a href="/government">Government</a></li>
									<li><a href="/residential">Residential</a></li>
									<li><a href="/cell">Cell Tower</a></li>
									<li><a href="/enterprise">Enterprises</a></li>
									</ul>
								</li>
								<li><a href="">Service Partners</a></li>
								<li><a href="/AboutUs">About Us</a></li>
								<li><a href="/contact">Contact</a></li>
								<li><a href="">Register</a></li>
							</ul>
						</nav>
						<img className="user" src="/public/assets/Group 80.jpg" />
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header;