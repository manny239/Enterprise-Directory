import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

const Welcome = () => {
    return(
        <>
            <style>{`
                /******** default stuff *************/
                * {
                    box-sizing: border-box;
                }
                
                .welcome-container {
                    margin: 0;
                    padding: 0;
                    text-align: center;
                }
                
                .page1 {
                    width: 100%;
                    height: 100vh;
                    background: url("https://lh3.googleusercontent.com/Hst38SvCa5xtgws2_HPtjq7agdSJJ7I1_-HRDMdKfYos0t0665whMMfm4rWUKGAXtw0JxygZi-7BcAgluOrYPoa0A7IZYLJZkI1CqIl1oEPIWUAasiMkqrmoiV7qr85UGoRTTG91s9p38Lux0zmm8G5CXsSpzRR4GrOw3yhOcvC4rr3447X5RHRPKDszTxYBQBmkSUSENcWb7kluZN53HINlzNlQUy4PhaagcV5f6DRJG2TIcJzruS5RcXM22MZFXeK79vtUSTnY9S5FWz1j0Yrql9RKAiCs9lCLMl3fx6S8nRk7u_LOLWZZBVFuVsRqYVy_xngy5zLZ9FtTl2bkAa5T46RoyUU4A4LWlvRLHrZiow-fapsr2A6YJyvTKNpCvAGusSdrX27RlnanfS0BjRCu_7dzmHnExTfX6cSu_MJmmemObMVbN3qeGQb1x9v2PXV3UEsjw9SMzzb5ETm_Qh8Aso3Em0vXOwVKY7cq-GOjX20wGk6x8ml2grmBmKGMACzIaha8yjL6_IRJ2fZDZy7gkuuLGNnJswHo7USRzS3ifbCTHIGBKGNdPvOn6h79g6GA8YyWAqi0xzs_eCtfHuyf0UvD2ue6tjBJ5t69j-lxGvtQMsrqvMAGf6-QhfvnHrwUd5TCYRPB4SOIKmZZps9tXPp6Oh95lWnxjkjC=w1014-h662-no") no-repeat center center;
                    background-size: cover;
                    background-attachment: fixed;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .page1-content {
                    background: rgba(0, 0, 0, 0.6);
                    padding: 3rem;
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    max-width: 800px;
                    margin: 0 2rem;
                }
                
                .page1-content h1 {
                    color: #ffffff;
                    font-size: 3rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    font-family: 'Poppins', sans-serif;
                }
                
                .page1-content h2 {
                    color: #ffffff;
                    font-size: 1.5rem;
                    font-weight: 400;
                    line-height: 1.6;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                    font-family: 'Poppins', sans-serif;
                }
                
                .page1-content .highlight {
                    color: #ffd700;
                    font-weight: 600;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
                }
                
                .page2 {
                    width: 100%;
                    height: 70vh;
                    background-color: black;
                    opacity: 0.75;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .page2wrapper {
                    background: url("https://lh3.googleusercontent.com/Hst38SvCa5xtgws2_HPtjq7agdSJJ7I1_-HRDMdKfYos0t0665whMMfm4rWUKGAXtw0JxygZi-7BcAgluOrYPoa0A7IZYLJZkI1CqIl1oEPIWUAasiMkqrmoiV7qr85UGoRTTG91s9p38Lux0zmm8G5CXsSpzRR4GrOw3yhOcvC4rr3447X5RHRPKDszTxYBQBmkSUSENcWb7kluZN53HINlzNlQUy4PhaagcV5f6DRJG2TIcJzruS5RcXM22MZFXeK79vtUSTnY9S5FWz1j0Yrql9RKAiCs9lCLMl3fx6S8nRk7u_LOLWZZBVFuVsRqYVy_xngy5zLZ9FtTl2bkAa5T46RoyUU4A4LWlvRLHrZiow-fapsr2A6YJyvTKNpCvAGusSdrX27RlnanfS0BjRCu_7dzmHnExTfX6cSu_MJmmemObMVbN3qeGQb1x9v2PXV3UEsjw9SMzzb5ETm_Qh8Aso3Em0vXOwVKY7cq-GOjX20wGk6x8ml2grmBmKGMACzIaha8yjL6_IRJ2fZDZy7gkuuLGNnJswHo7USRzS3ifbCTHIGBKGNdPvOn6h79g6GA8YyWAqi0xzs_eCtfHuyf0UvD2ue6tjBJ5t69j-lxGvtQMsrqvMAGf6-QhfvnHrwUd5TCYRPB4SOIKmZZps9tXPp6Oh95lWnxjkjC=w1014-h662-no") no-repeat center center;
                    background-attachment: fixed;
                    background-size: cover;
                }
                
                .content {
                    color: white;
                    padding: 12%;
                    font-family: 'Poppins', sans-serif;
                }
                
                .content h1 {
                    font-size: 3rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
                }
                
                .content h2 {
                    font-size: 1.8rem;
                    font-weight: 400;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
                }
                
                @media (max-width: 768px) {
                    .page1-content h1 {
                        font-size: 2rem;
                    }
                    .page1-content h2 {
                        font-size: 1.2rem;
                    }
                    .content h1 {
                        font-size: 2rem;
                    }
                    .content h2 {
                        font-size: 1.3rem;
                    }
                    .page1-content {
                        padding: 2rem;
                        margin: 0 1rem;
                    }
                }
            `}</style>
            
            <div className="welcome-container">
                <div className="page1">
                    <div className="page1-content">
                        <h1>Colleagues are the heartbeat of every corporation</h1>
                        <h2>
                            At BitBandits, we handle the overload of managing your workplace directory so that{' '}
                            <span className="highlight">you</span>{' '}
                            can focus on the things that matter most
                        </h2>
                    </div>
                </div>
                
                <div className="page2wrapper">
                    <div className="page2">
                        <div className="content">
                            <h1>Enterprise Directory Solutions</h1>
                            <h2>For companies who value their people</h2>
                        </div>
                    </div>	
                </div>
            </div>
        </>
    );
};
export default Welcome;