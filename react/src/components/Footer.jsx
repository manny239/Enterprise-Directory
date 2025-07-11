import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

const Footer = () => {
    return(
        <>
            <style>{`
                .glassmorphism-footer {
                    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
                    backdrop-filter: blur(10px);
                    border-top: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 -8px 32px rgba(0,0,0,0.1);
                    margin-top: auto;
                    padding: 2rem 0;
                    text-align: center;
                    font-family: 'Poppins', sans-serif;
                    position: relative;
                    bottom: 0;
                    width: 100%;
                }
                .glassmorphism-footer .footer-content {
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    margin: 0;
                }
                .glassmorphism-footer .footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 1rem;
                }
                .glassmorphism-footer .footer-link {
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 400;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    transition: all 0.3s ease;
                    border: 1px solid transparent;
                }
                .glassmorphism-footer .footer-link:hover {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    transform: translateY(-2px);
                    color: #ffffff;
                }
                .glassmorphism-footer .footer-divider {
                    width: 60%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    margin: 1.5rem auto;
                }
            `}</style>
            <footer className="glassmorphism-footer">
                <div className="container">
                    <div className="footer-content">
                        <strong>© 2025 Enterprise Directory - Bit Bandits Inc. All rights reserved</strong>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;