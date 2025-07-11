import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
// Remove the JSON import - we'll use the backend instead
// import credentialsData from '../assets/passwordList.json'

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const LoginForm = () => {
    const navigate = useNavigate();
    
    //form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //form submission and validation
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');

    //handling input changes
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    //form validation
    useEffect(()=> {
        const validateForm =()=> {
            let tempErrors = {};
            if (username.trim() === ''){
                tempErrors.username = "username needed"
            }

            if(password.length < 3){
                tempErrors.password = "Password must be minimum 3 chars"
            }
            setErrors(tempErrors);
            setIsFormValid(Object.keys(tempErrors).length === 0);
        };
        validateForm();
    }, [username, password])

    //handling submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.toLowerCase(),
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setLoginStatus('Login successful');
                
                // Navigate to employee page and pass user data
                setTimeout(() => {
                    navigate('/employee', { 
                        state: { 
                            fullName: data.user.fullName,
                            userId: data.user._id,
                            userData: data.user
                        }
                    });
                }, 1000);
            } else {
                setLoginStatus(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginStatus('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <>
            <style>{`
                .login-container {
                    background-color: #080710;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Poppins', sans-serif;
                }
                .background {
                    width: 430px;
                    height: 520px;
                    position: absolute;
                    transform: translate(-50%,-50%);
                    left: 50%;
                    top: 50%;
                }
                .background .shape {
                    height: 200px;
                    width: 200px;
                    position: absolute;
                    border-radius: 50%;
                }
                .shape:first-child {
                    background: linear-gradient(
                        #1845ad,
                        #23a2f6
                    );
                    left: -80px;
                    top: -80px;
                }
                .shape:last-child {
                    background: linear-gradient(
                        to right,
                        #ff512f,
                        #f09819
                    );
                    right: -30px;
                    bottom: -80px;
                }
                .glassmorphism-form {
                    height: 520px;
                    width: 400px;
                    background-color: rgba(255,255,255,0.13);
                    position: absolute;
                    transform: translate(-50%,-50%);
                    top: 50%;
                    left: 50%;
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                    border: 2px solid rgba(255,255,255,0.1);
                    box-shadow: 0 0 40px rgba(8,7,16,0.6);
                    padding: 50px 35px;
                }
                .glassmorphism-form * {
                    font-family: 'Poppins', sans-serif;
                    color: #ffffff;
                    letter-spacing: 0.5px;
                    outline: none;
                    border: none;
                }
                .glassmorphism-form h3 {
                    font-size: 32px;
                    font-weight: 500;
                    line-height: 42px;
                    text-align: center;
                    margin-bottom: 30px;
                }
                .glassmorphism-form label {
                    display: block;
                    margin-top: 30px;
                    font-size: 16px;
                    font-weight: 500;
                }
                .glassmorphism-form input {
                    display: block;
                    height: 50px;
                    width: 100%;
                    background-color: rgba(255,255,255,0.07);
                    border-radius: 3px;
                    padding: 0 10px;
                    margin-top: 8px;
                    font-size: 14px;
                    font-weight: 300;
                }
                .glassmorphism-form input::placeholder {
                    color: #e5e5e5;
                }
                .glassmorphism-form button {
                    margin-top: 50px;
                    width: 100%;
                    background-color: #ffffff;
                    color: #080710;
                    padding: 15px 0;
                    font-size: 18px;
                    font-weight: 600;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .glassmorphism-form button:hover {
                    background-color: #f0f0f0;
                    transform: translateY(-2px);
                }
                .glassmorphism-form button:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                    transform: none;
                }
                .login-status {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 500;
                }
                .login-status.success {
                    color: #4CAF50;
                }
                .login-status.error {
                    color: #f44336;
                }
            `}</style>
            
            <div className="login-container">
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <form className="glassmorphism-form" onSubmit={handleSubmit}>
                    <h3>Login Here</h3>

                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        placeholder="Enter your username"
                        value={username} 
                        onChange={handleUsernameChange} 
                        id="username"
                        disabled={isSubmitting}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        value={password} 
                        onChange={handlePasswordChange} 
                        id="password"
                        disabled={isSubmitting}
                    />

                    {loginStatus && (
                        <div className={`login-status ${loginStatus.includes('successful') ? 'success' : 'error'}`}>
                            {loginStatus}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isSubmitting || !isFormValid}
                    >
                        {isSubmitting ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
            </div>
        </>
    );
};
export default LoginForm;