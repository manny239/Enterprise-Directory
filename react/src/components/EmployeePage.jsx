import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
const EmployeePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    //get user data from navigation state
    const {fullName, userId, userData} = location.state ||{};

    //redirecting if no user data (direct access without login)
    if(!fullName){
        navigate('/login');
        return null;
    }

    //set employee data from the login response
    useEffect(()=> {
        if (userData){
            setEmployee(userData);
            setLoading(false);
        }
    }, [userData]);

    if(loading){
        return <div>Loading employee data</div>;
    }
    if(!employee){
        return <div>Employee data not found</div>
    }

    return(
        <div className = "card" style={{flex: "1", minWidth: "300px", maxWidth: "45%" }}>
            <div className = "card-body">
                <h5 className="card-title">Employee Information:</h5>
                <div className="card-text"> Full Name: {employee.fullName}</div>
                <div className="card-text"> Phone Number: {employee.phoneNumber}</div>
                <div className="card-text">Job Role: {employee.jobRole} </div>
                <div className="card-text"> Work Location: {employee.workLocation} </div>
                <div className="card-text">Salary: ${employee.salary.toLocaleString()} </div>
                <button className = "btn btn-secondary mt-3" onClick={() => navigate('/login')}>
                    Logout
                </button>
            </div>
        </div>

    );
};
export default EmployeePage;