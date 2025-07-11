import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const EmployeePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [manager, setManager] = useState(null);
    const [subordinate, setSubordinate] = useState(null);
    
    //search functionality state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

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

    //fetching 

    // Search functionality
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setIsSearching(true);
        try {
            // Pass the current user's job role to determine salary visibility
            const searchUrl = `${baseUrl}/api/search?query=${encodeURIComponent(searchQuery)}&userRole=${encodeURIComponent(employee.jobRole || '')}`;
            
            const response = await fetch(searchUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSearchResults(data || []);
                setShowModal(true);
            } else {
                console.error('Search failed');
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleEmployeeSelect = (selectedEmp) => {
        setSelectedEmployee({
            _id: selectedEmp._id,
            fullName: selectedEmp.name,
            phoneNumber: selectedEmp.phone_number,
            jobRole: selectedEmp.job_role,
            workLocation: selectedEmp.work_location,
            salary: selectedEmp.salary
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEmployee(null);
        setSearchResults([]);
        setSearchQuery('');
    };

    if(loading){
        return <div>Loading employee data</div>;
    }
    if(!employee){
        return <div>Employee data not found</div>
    }

    return(
        <>
            <section className="search-lookup">
                <form className="d-flex" role="search" style={{width: "300px", marginLeft: "35%", marginTop: "15px", marginBottom: "15px"}} onSubmit={handleSearch}>
                    <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Search Employees" 
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={isSearching}
                    />
                    <button 
                        className="btn btn-outline-success" 
                        type="submit"
                        disabled={isSearching || !searchQuery.trim()}
                    > 
                        {isSearching ? 'Searching...' : 'Search'}
                    </button>
                </form>
            </section>
            <hr />
            <section className="employee-details">
                <div className = "card" style={{flex: "1", minWidth: "200px", maxWidth: "25%", marginLeft: "100px"}}>
                    <div className = "card-body">
                        <h5 className="card-title">Employee Information:</h5>
                        <div className="card-text">Full Name: {employee.fullName || 'N/A'}</div>
                        <div className="card-text">Phone Number: {employee.phoneNumber || 'N/A'}</div>
                        <div className="card-text">Job Role: {employee.jobRole || 'N/A'}</div>
                        <div className="card-text">Work Location: {employee.workLocation || 'N/A'}</div>
                        <div className="card-text">Salary: {employee.salary ? `$${employee.salary.toLocaleString()}` : 'N/A'}</div>
                        <div className="card-text">Employee ID: {employee._id || 'N/A'}</div>
                    
                        <button className = "btn btn-secondary mt-3" onClick={() => navigate('/login')}>
                            Logout
                        </button>
                    </div>
                </div>
            </section>
            <hr style={{color: "white"}} /> 
            <h3 style={{color: "white", marginLeft: "50%"}}> Reports To </h3>
            <section className="reports-to">
                <div className = "card" style={{flex: "1", minWidth: "200px", maxWidth: "25%", marginLeft: "100px"}}>
                    <div className = "card-body">
                        <h5 className="card-title">Manager Information:</h5>
                        <div className="card-text">Full Name: {manager?.fullName || 'N/A'}</div>
                        <div className="card-text">Phone Number: {manager?.phoneNumber || 'N/A'}</div>
                        <div className="card-text">Job Role: {manager?.jobRole || 'N/A'}</div>
                        <div className="card-text">Work Location: {manager?.workLocation || 'N/A'}</div>
                    </div>
                </div>
            </section>
            <hr style={{color: "white"}} />   
            <h3 style={{color: "white", marginLeft: "50%"}}>Direct Reports</h3>
            <section className="in-charge-of">
                <div className = "card" style={{flex: "1", minWidth: "200px", maxWidth: "25%", marginLeft: "100px"}}>
                    <div className = "card-body">
                        <h5 className="card-title">Subordinate Information:</h5>
                        <div className="card-text">Full Name: {subordinate?.fullName || 'N/A'}</div>
                        <div className="card-text">Phone Number: {subordinate?.phoneNumber || 'N/A'}</div>
                        <div className="card-text">Job Role: {subordinate?.jobRole || 'N/A'}</div>
                        <div className="card-text">Work Location: {subordinate?.workLocation || 'N/A'}</div>
                        <div className="card-text">Salary: {subordinate?.salary ? `$${subordinate.salary.toLocaleString()}` : 'N/A'}</div>
                    </div>
                </div>
            </section>
            <h1></h1>

            {/* Search Results Modal */}
            {showModal && (
                <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Search Results</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {searchResults.length > 0 ? (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6>Select an Employee:</h6>
                                            <div className="list-group" style={{maxHeight: '400px', overflowY: 'auto'}}>
                                                {searchResults.map((emp) => (
                                                    <button
                                                        key={emp._id}
                                                        type="button"
                                                        className={`list-group-item list-group-item-action ${selectedEmployee?._id === emp._id ? 'active' : ''}`}
                                                        onClick={() => handleEmployeeSelect(emp)}
                                                    >
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h6 className="mb-1">{emp.name}</h6>
                                                            <small>{emp.job_role}</small>
                                                        </div>
                                                        <p className="mb-1">{emp.work_location}</p>
                                                        <small>{emp.phone_number}</small>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {selectedEmployee ? (
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h6>Employee Details</h6>
                                                    </div>
                                                    <div className="card-body">
                                                        <p><strong>Full Name:</strong> {selectedEmployee.fullName}</p>
                                                        <p><strong>Phone Number:</strong> {selectedEmployee.phoneNumber}</p>
                                                        <p><strong>Job Role:</strong> {selectedEmployee.jobRole}</p>
                                                        <p><strong>Work Location:</strong> {selectedEmployee.workLocation}</p>
                                                        <p><strong>Salary:</strong> {
                                                            selectedEmployee.salary === 'Restricted' ? 
                                                            'Restricted' : 
                                                            `$${selectedEmployee.salary?.toLocaleString()}`
                                                        }</p>
                                                        <p><strong>Employee ID:</strong> {selectedEmployee._id}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center text-muted">
                                                    <p>Select an employee to view details</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p>No employees found matching your search.</p>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default EmployeePage;