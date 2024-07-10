import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/company/companydashboard/CompanyHome";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import CandidateHome from "./pages/candidate/Home";
import CompanyRegister from "./Auth/CompanyRegister";
import CompanyLogin from "./Auth/CompanyLogin";
import AddHiring from "./pages/company/AddHiringProcess";
import AddEmployee from "./pages/company/AddEmployee";
import ManageHiringProcess from "./pages/company/ManageHiringProcess";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/candidate" element={<CandidateHome />} />
        <Route path="/companylogin" element={<CompanyLogin />} />
        <Route path="/companyregister" element={<CompanyRegister />} />
        <Route path="/hiring" element={<AddHiring />} />
        <Route path="/employee" element={<AddEmployee />} />
        <Route path="/manage/:id" element={<ManageHiringProcess />} />
      </Routes>
    </Router>
  );
};

export default App;
