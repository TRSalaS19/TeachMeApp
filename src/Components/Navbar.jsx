import React from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/teachMeLogo.png';
import '../Styles/navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary p-0">
            <div className="container-fluid nav-container">
                <div className="nav-brand-div">
                    <Link to='/' className="navbar-brand nav-brand" href="#">
                        <img className="nav-logo" src={Logo} alt="" />
                        <p className="logo-name">TeachMe</p>
                    </Link>
                </div>
                <div className="link-div">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link to='/' className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link to='/dogBreedSearchPage' className="nav-link">Search Breeds</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/countrysearch" className="nav-link">Country Info</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/newsPage" className="nav-link">Find News</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}