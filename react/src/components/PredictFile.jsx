import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const baseMainUrl = import.meta.env.VITE_MAIN_URL
const basePredUrl = import.meta.env.VITE_PRED_URL

const PredictFile = ({ }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [validJobRoles, setValidJobRoles] = useState(new Set())
  const [validWorkLocations, setValidWorkLocations] = useState(new Set())

  const downloadJson = (data) => {
    const jsonStr = JSON.stringify(data, null, 2)

    const blob = new Blob([jsonStr], { type: 'application/json' })

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "predictions.json"

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  const handleUpload = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    if (selectedFile) {
      try {
        // Create a FileReader to read the file content
        const reader = new FileReader();

        // Define what happens when file reading is complete
        reader.onload = async (e) => {
          try {
            // Parse the file content as JSON
            const submission = JSON.parse(e.target.result);

            // TODO: Validate file data

            console.log(`${basePredUrl}/predict`);
            const response = await fetch(`${basePredUrl}/predict`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              mode: 'cors',
              body: JSON.stringify(submission),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            downloadJson(data)
            // alert(`Predicted Salaries:\n${data.map((value) => "$" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "\n")}`);
          } catch (error) {
            console.error("Error processing JSON or making prediction", error);
            alert("Error: Invalid JSON format or prediction failed");
          }
        };

        // Handle file reading errors
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
          alert("Error reading the file");
        };

        // Start reading the file as text
        reader.readAsText(selectedFile);

      } catch (error) {
        console.error("Error handling file", error);
        alert("Error processing the file");
      }
    }
    else {
      alert("No file selected");
    }
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  useEffect(() => {
    async function getValidValues() {
      let validJobRolesUrl = `${baseMainUrl}/valid/jobroles`
      let validWorkLocationsUrl = `${baseMainUrl}/valid/worklocations`

      try {
        // Should return arrays of strings
        let validJobRolesResult = await fetch(validJobRolesUrl).then(res => res.json())
        let validWorkLocationsResult = await fetch(validWorkLocationsUrl).then(res => res.json())

        setValidJobRoles(new Set(validJobRolesResult))
        setValidWorkLocations(new Set(validWorkLocationsResult))
      }
      catch (err) {
        console.error(err)
        alert("Failed to fetch valid data for the form options.")
      }
    }

    getValidValues()
  }, [])

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <form onSubmit={handleUpload}>
        <input type="file" style={{color: "white"}} onChange={handleFileChange} />
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>

  )
}

export default PredictFile
