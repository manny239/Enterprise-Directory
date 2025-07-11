import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const baseMainUrl = import.meta.env.VITE_MAIN_URL
const basePredUrl = import.meta.env.VITE_PRED_URL

const PredictPage = ({ }) => {
  const [jobRole, setJobRole] = useState('')
  const [workLocation, setWorkLocation] = useState('')
  const [validJobRoles, setValidJobRoles] = useState(new Set())
  const [validWorkLocations, setValidWorkLocations] = useState(new Set())

  //handling input changes
  const handleJobRoleChange = (e) => {
    setJobRole(e.target.value)
  }
  const handleWorkLocationChange = (e) => {
    setWorkLocation(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const submission = {
        job_role: jobRole,
        work_location: workLocation,
      }

      const response = await fetch(`${basePredUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert(`Predicted Salary: ${data[0]}`)
    } catch (error) {
      console.error("Error posting data", error)
      alert("Error making the prediction")
    }
  }

  useEffect(() => {
    async function getValidValues() {
      let validJobRolesUrl = `${baseMainUrl}/validjobroles`
      let validWorkLocationsUrl = `${baseMainUrl}/validworklocations`

      // try {
      //   // Should return arrays of strings
      //   let validJobRolesResult = await fetch(validJobRolesUrl).then(res => res.json())
      //   let validWorkLocationsResult = await fetch(validWorkLocationsUrl).then(res => res.json())

      //   setValidJobRoles(new Set(validJobRolesResult))
      //   setValidWorkLocations(new Set(validWorkLocationsResult))
      // }
      // catch (err) {
      //   console.error (err)
      //   alert ("Failed to fetch valid data for the form options.")
      // }

      // TEMP
      setValidJobRoles(new Set(["Director", "Software Engineer", "HR", "Police Enforcer"]))
      setValidWorkLocations(new Set(["USA", "UK", "China", "Australia"]))
    }

    getValidValues()
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit} className="p-3">
        <div className="form-group" style={{padding: "0.5rem"}}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="jobRole" style={{width: "10rem"}}>Job Role</label>
            <select
              className="form-control"
              id="jobRole"
              name="jobRole"
              value={jobRole}
              onChange={handleJobRoleChange}
              style={{maxWidth: "15rem"}}
            >
              {
                [...validJobRoles].sort().map((job) => {
                  return <option key={job}>{job}</option>
                })
              }
            </select>
          </div>
        </div>
        <div className="form-group" style={{padding: "0.5rem"}}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="workLocation" style={{width: "10rem"}}>Work Location</label>
            <select
              className="form-control"
              id="workLocation"
              name="workLocation"
              value={workLocation}
              onChange={handleWorkLocationChange}
              style={{maxWidth: "15rem"}}
            >
              {
                [...validWorkLocations].sort().map((location) => {
                  return <option key={location}>{location}</option>
                })
              }
            </select>
          </div>
        </div>
        <div className="text-center" style={{ paddingTop: "1rem" }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default PredictPage