import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <>
            <style>{`
                .glassmorphism-header {
                    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
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
                }
                .glassmorphism-header .nav-link:hover {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }
                .glassmorphism-header .nav-link.active {
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    font-weight: 600;
                }
                .glassmorphism-header .brand-title {
                    color: #ffffff;
                    font-size: 24px;
                    font-weight: 600;
                    text-decoration: none;
                    margin-right: 2rem;
                }
                body {
                    background: linear-gradient(135deg, #080710, #1a1a2e);
                    min-height: 100vh;
                }
            `}</style>
            <nav className="glassmorphism-header">
              <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <Link to="/" className="brand-title">Enterprise Directory</Link>
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
                      <li className="nav-item">
                        <a className="nav-link" href="#">About Us</a>
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