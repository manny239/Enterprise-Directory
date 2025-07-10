import React,  {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import credentialsData from '../assets/passwordList.json'

const LoginForm = () => {
    //form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //form submission and validation
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [credentials, setCredentials] = useState([]);
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

            if(password.length < 4){
                tempErrors.password = "Password must be minimum 4 chars"
            }
            setErrors(tempErrors);
            setIsFormValid(Object.keys(tempErrors).length === 0);
        };
        validateForm();
    }, [username, password])

    useEffect(()=>{
        setCredentials(credentialsData);
    }, [])

    //handling submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //finding a matching user
        let matchingUser = null;
        for(let i=0; i<credentials.length; i++){
            const user = credentials[i];
            if(user.username === username && user.password === password){
                matchingUser = user;
                break;
            }
        }
        //checking if a matching user was found or not 
        if(matchingUser){
            setLoginStatus('Login successful');
            
            // Navigate to employee page and pass fullName
            setTimeout(() => {
                navigate('/employee', { 
                    state: { 
                        fullName: matchingUser.fullName
                    }
                });
            }, 1000);
        }
        
        else{
            setLoginStatus('invalid username or password')
        }
    }

    return(
        <>
            <section id="login-form">
                <form onSubmit={handleSubmit} style={{marginLeft: "20px"}}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" value={username} onChange={handleUsernameChange} className="form-control" id="username" /> 
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} className="form-control" id="password" />
                  </div>
                    {loginStatus && <p className={loginStatus.includes('successful') ? 'success' : 'error'}>
                        {loginStatus}
                    </p>}
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </section>

        </>
    );
};
export default LoginForm;