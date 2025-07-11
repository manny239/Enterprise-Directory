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
            console.log('Employee data received:', userData); 
            console.log('Available properties:', Object.keys(userData)); 
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
        <>
            <section className="search-lookup">
                <form className="d-flex" role="search" style={{width: "300px", marginLeft: "35%", marginTop: "15px", marginBottom: "15px"}}>
                    <input className="form-control me-2" type="search" placeholder="Search Employees" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit"> Search </button>
                </form>
            </section>
            <div className = "card" style={{flex: "1", minWidth: "200px", maxWidth: "25%", marginLeft: "100px"}}>
                <div className = "card-body">
                    <h5 className="card-title">Employee Information:</h5>
                    <div className="card-text">Full Name: {employee.fullName}</div>
                    <div className="card-text">Phone Number: {employee.phoneNumber}</div>
                    <div className="card-text">Job Role: {employee.jobRole}</div>
                    <div className="card-text">Work Location: {employee.workLocation}</div>
                    <div className="card-text">Salary: {employee.salary}</div>
                    <div className="card-text">Employee ID: {employee._id}</div>
                    
                    <button className = "btn btn-secondary mt-3" onClick={() => navigate('/login')}>
                        Logout
                    </button>
                </div>
            </div>
        </>

    );
};
export default EmployeePage;