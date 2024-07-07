import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import CompanyRegister from "./Auth/CompanyRegister";
import AddHiringProcess from "./pages/company/AddHiringProcess";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companyregister" element={<CompanyRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/company/add-hiring-process"
          element={<AddHiringProcess />}
        />
      </Routes>
    </Router>
  );
};
export default App;
