import React,  {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css'
import Welcome from './components/Welcome'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import EmployeePage from './components/EmployeePage'

function App() {

  const BaseURL = "http://localhost:5173/"
  const [data, setData] = useState([]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/employee" element={<EmployeePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App
