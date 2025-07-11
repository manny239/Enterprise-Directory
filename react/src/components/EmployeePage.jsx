import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const EmployeePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [manager, setManager] = useState(null);
    const [subordinates, setSubordinates] = useState([]);
    
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
            
            // Fetch manager and subordinate data
            fetchManagerAndSubordinates();
        }
    }, [userData]);

    // Fetch manager and subordinate information
    const fetchManagerAndSubordinates = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/employee/${userData._id}/hierarchy`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                
                // Set manager data
                if (data.manager) {
                    setManager(data.manager);
                }

                // Set subordinate data
                if (data.subordinates && data.subordinates.length > 0) {
                    setSubordinates(data.subordinates);
                } else {
                    setSubordinates([]);
                }
            } else {
                console.error('Failed to fetch hierarchy data');
            }
        } catch (error) {
            console.error('Error fetching manager/subordinate data:', error);
        }
    }; 

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
            <style>{`
                .hierarchy-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 15px;
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                    color: white;
                    transition: all 0.3s ease;
                }
                
                .hierarchy-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
                }
                
                .hierarchy-card .card-title {
                    color: #ffffff;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    text-align: center;
                }
                
                .hierarchy-card .card-text {
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 0.5rem;
                    font-size: 0.95rem;
                }
                
                .section-header {
                    color: #ffffff;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                    font-weight: 600;
                    margin-bottom: 1rem;
                }
                
                .counter-badge {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.875rem;
                    backdrop-filter: blur(10px);
                }
                
                .subordinates-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    max-width: 1800px;
                    margin: 1rem auto;
                    padding: 0 2rem;
                }
                
                .subordinate-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 15px;
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                    color: white;
                    transition: all 0.3s ease;
                    padding: 1.5rem;
                    min-height: 220px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                
                .subordinate-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
                }
                
                .subordinate-card h6 {
                    color: #ffffff;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    text-align: center;
                    font-size: 1.1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    padding-bottom: 0.5rem;
                }
                
                .subordinate-card .card-text {
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                }
                
                .subordinate-card .card-text strong {
                    color: rgba(255, 255, 255, 1);
                    font-weight: 600;
                }
                
                @media (max-width: 1400px) {
                    .subordinates-grid {
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    }
                }
                
                @media (max-width: 900px) {
                    .subordinates-grid {
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 1rem;
                    }
                }
                
                @media (max-width: 768px) {
                    .subordinates-grid {
                        grid-template-columns: 1fr;
                        padding: 0 1rem;
                    }
                }
            `}</style>
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
                <div className="hierarchy-card" style={{flex: "1", minWidth: "200px", maxWidth: "25%", marginLeft: "100px"}}>
                    <div className="card-body">
                        <h5 className="card-title">Employee Information</h5>
                        <div className="card-text">Full Name: {employee.fullName || 'N/A'}</div>
                        <div className="card-text">Phone Number: {employee.phoneNumber || 'N/A'}</div>
                        <div className="card-text">Job Role: {employee.jobRole || 'N/A'}</div>
                        <div className="card-text">Work Location: {employee.workLocation || 'N/A'}</div>
                        <div className="card-text">Salary: {employee.salary ? `$${employee.salary.toLocaleString()}` : 'N/A'}</div>
                        <div className="card-text">Employee ID: {employee._id || 'N/A'}</div>
                    
                        <button className="btn btn-secondary mt-3" onClick={() => navigate('/login')}>
                            Logout
                        </button>
                    </div>
                </div>
            </section>
            <hr style={{color: "white"}} /> 
            <h3 className="section-header" style={{marginLeft: "50%"}}>Reports To</h3>
            <section className="reports-to">
                <div className="hierarchy-card" style={{flex: "1", minWidth: "200px", maxWidth: "25%", marginLeft: "100px"}}>
                    <div className="card-body">
                        <h5 className="card-title">Manager Information</h5>
                        {manager ? (
                            <>
                                <div className="card-text">Full Name: {manager.fullName || 'N/A'}</div>
                                <div className="card-text">Phone Number: {manager.phoneNumber || 'N/A'}</div>
                                <div className="card-text">Job Role: {manager.jobRole || 'N/A'}</div>
                                <div className="card-text">Work Location: {manager.workLocation || 'N/A'}</div>
                            </>
                        ) : (
                            <div className="card-text">No manager found (This person may be at the top level)</div>
                        )}
                    </div>
                </div>
            </section>
            <hr style={{color: "white"}} />   
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1800px', margin: '0 auto', padding: '0 2rem'}}>
                <h3 className="section-header">Direct Reports</h3>
                {subordinates.length > 0 && (
                    <div className="counter-badge">
                        {subordinates.length} {subordinates.length === 1 ? 'Direct Report' : 'Direct Reports'}
                    </div>
                )}
            </div>
            <section className="in-charge-of">
                {subordinates.length > 0 ? (
                    <div className="subordinates-grid">
                        {subordinates.map((subordinate, index) => (
                            <div key={subordinate._id || index} className="subordinate-card">
                                <h6>{subordinate.fullName}</h6>
                                <div className="card-text"><strong>Phone:</strong> {subordinate.phoneNumber || 'N/A'}</div>
                                <div className="card-text"><strong>Role:</strong> {subordinate.jobRole || 'N/A'}</div>
                                <div className="card-text"><strong>Location:</strong> {subordinate.workLocation || 'N/A'}</div>
                                <div className="card-text"><strong>Salary:</strong> {subordinate.salary ? `$${subordinate.salary.toLocaleString()}` : 'N/A'}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="hierarchy-card" style={{flex: "1", minWidth: "200px", maxWidth: "25%", margin: "0 auto"}}>
                        <div className="card-body">
                            <h5 className="card-title">No Direct Reports</h5>
                            <div className="card-text">This employee has no direct reports.</div>
                        </div>
                    </div>
                )}
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