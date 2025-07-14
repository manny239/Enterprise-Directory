import PredictSingle from "./PredictSingle.jsx"
import PredictFile from "./PredictFile.jsx"
import { useState } from "react"

const PredictPage = ({ }) => {
  const [mode, setMode] = useState("none") // none, file, single
  const [selectedMode, setSelectedMode] = useState("single") // none, file, single

  const handleModeChange = (e) => {
    setSelectedMode(e.target.value)
  }

  const handleSubmit = (e) => {
    setMode(selectedMode)
  }

  return (
    <>
      {
        mode === "none" &&
        <form onSubmit={handleSubmit} className="p-3">
          <div className="form-group" style={{ padding: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <label htmlFor="predMode" style={{ width: "10rem", color: "white" }}>Prediction Mode</label>
              <select
                className="form-control"
                id="predMode"
                name="predMode"
                value={selectedMode}
                onChange={handleModeChange}
                style={{ maxWidth: "15rem" }}
              >
                <option value={"single"}>Single</option>
                <option value={"file"}>File</option>
              </select>
            </div>
          </div>
          <div className="text-center" style={{ paddingTop: "1rem" }}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      }
      {
        mode === "single" &&
        <PredictSingle />
      }
      {
        mode === "file" &&
        <PredictFile />
      }
      {
        mode !== "none" &&

        <div className="text-center" style={{ paddingTop: "1rem" }}>
          <button onClick={() => setMode("none")} type="submit" className="btn btn-primary">
            Back
          </button>
        </div>
      }
    </>
  )
}

export default PredictPage