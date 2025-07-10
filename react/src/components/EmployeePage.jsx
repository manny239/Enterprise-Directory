import React, {useState, useEffect} from 'react'

const EmployeePage = (props) => {

    return(
        <div className = "card" style={{flex: "1", minWidth: "300px", maxWidth: "45%" }}>
            <div className = "card-body">
                <h5 className="card-title">Employee Information:</h5>
                <div className="card-text"> Full Name: </div>
                <div className="card-text"> Phone Number: </div>
                <div className="card-text">Job Role: </div>
                <div className="card-text"> Work Location: </div>
                <div className="card-text">Salary: </div>
            </div>
        </div>

    );
};
export default EmployeePage;