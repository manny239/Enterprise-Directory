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
            <section id="login-form">
                <form onSubmit={handleSubmit} style={{marginLeft: "20px"}}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={handleUsernameChange} 
                        className="form-control" 
                        id="username"
                        disabled={isSubmitting}
                    /> 
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        className="form-control" 
                        id="password"
                        disabled={isSubmitting}
                    />
                  </div>
                    {loginStatus && <p className={loginStatus.includes('successful') ? 'success' : 'error'}>
                        {loginStatus}
                    </p>}
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting || !isFormValid}
                  >
                    {isSubmitting ? 'Logging in...' : 'Submit'}
                  </button>
                </form>
            </section>
        </>
    );
};
export default LoginForm;