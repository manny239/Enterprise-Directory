import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css'
import Welcome from './components/Welcome'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import EmployeePage from './components/EmployeePage'
import PredictPage from './components/PredictPage'

function App() {

  const BaseURL = "http://localhost:5173/"
  const [data, setData] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Router>
        <Header />
        <div style={{flex: "1 0 auto"}}>
          <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/predict" element={<PredictPage />} />
        </Routes>
        </div>
        
        <div style={{marginTop: "auto"}}>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App
