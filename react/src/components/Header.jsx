import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <>
            <style>{`
                .glassmorphism-header {
                    background: linear-gradient(135deg, rgba(10,15,30,0.9), rgba(20,25,45,0.85));
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255,255,255,0.15);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                    margin: 0;
                    padding: 1rem 0;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    font-family: 'Poppins', sans-serif;
                }
                .glassmorphism-header .container-fluid {
                    padding: 0 2rem;
                }
                .glassmorphism-header .navbar-nav {
                    gap: 2rem;
                }
                .glassmorphism-header .nav-link {
                    color: #ffffff !important;
                    font-weight: 500;
                    font-size: 16px;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    background: transparent;
                    border: 1px solid transparent;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                }
                .glassmorphism-header .nav-link:hover {
                    background: rgba(255,255,255,0.15);
                    border: 1px solid rgba(255,255,255,0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                    color: #ffffff !important;
                }
                .glassmorphism-header .nav-link.active {
                    background: rgba(255,255,255,0.25);
                    border: 1px solid rgba(255,255,255,0.4);
                    font-weight: 600;
                    color: #ffffff !important;
                }
                .glassmorphism-header .brand-title {
                    color: #ffffff;
                    font-size: 24px;
                    font-weight: 600;
                    text-decoration: none;
                    margin-right: 2rem;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.6);
                    transition: all 0.3s ease;
                }
                .glassmorphism-header .brand-title:hover {
                    color: #ffffff;
                    text-shadow: 0 2px 8px rgba(255,255,255,0.3);
                    transform: translateY(-1px);
                }
                body {
                    background: linear-gradient(135deg, #080710, #1a1a2e);
                    min-height: 100vh;
                }
            `}</style>
            <nav className="glassmorphism-header">
              <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <Link to="/" className="brand-title">Bit Bandits Enterprise Directory</Link>
                  <div className="d-flex">
                    <ul className="navbar-nav d-flex flex-row">
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/predict">Predict</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
        </>
    );
};
export default Header;