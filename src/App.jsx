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
import ManageCodingRound from "./pages/company/ManageCodingRound";
import Editor from "./pages/candidate/Coding.jsx/Editor";
import Questions from "./pages/candidate/Coding.jsx/Questions";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeDash from "./pages/employee/EmployeeDash";
import RegistrationLinkHandler from "./pages/candidate/ProcessRegistraton";
import MeetingRoom from "./interview/MeetingRoom";
import CreateJoinMeeting from "./interview/JoinMeeting";
import ManageInterview from "./pages/company/ManageInterview";
import Redirector from "./pages/employee/Redirector";
import Interview from "./pages/employee/Interview";
import CandidateInterview from "./pages/candidate/CandidateInterview";
import CodingRoundScores from "./pages/company/CodingRoundResult";
import Room from "./pages/employee/Room";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/process/:companyId/:processId"
          element={<CandidateHome />}
        />
        <Route path="/companylogin" element={<CompanyLogin />} />
        <Route path="/companyregister" element={<CompanyRegister />} />
        <Route path="/hiring" element={<AddHiring />} />
        <Route path="/employee" element={<AddEmployee />} />
        <Route path="/manage/:id" element={<ManageHiringProcess />} />
        <Route path="/manage/codinground/:id" element={<ManageCodingRound />} />
        <Route
          path="/manage/interviewround/:processId/:id"
          element={<ManageInterview />}
        />
        <Route
          path="/createresult/:hiringId/:roundId"
          element={<CodingRoundScores />}
        />
        <Route path="/question/:id" element={<Editor />} />
        <Route path="/assessment/:processId/:id" element={<Questions />} />
        <Route path="/employeelogin" element={<EmployeeLogin />} />
        <Route path="/employeedash" element={<EmployeeDash />} />
        <Route path="/register/:token" element={<RegistrationLinkHandler />} />
        {/* <Route path="/meeting" element={<CreateJoinMeeting />} /> */}
        {/* <Route path="/meeting/:roomName" element={<MeetingRoom />} />\ */}
        <Route path="/goto/:processId/:interviewId" element={<Redirector />} />
        <Route
          path="/interview/room/:processId/:interviewId"
          element={<Room />}
        />
        <Route
          path="/interview/admin/:processId/:interviewId"
          element={<Interview />}
        />
        <Route
          path="/interview/:interviewId"
          element={<CandidateInterview />}
        />
      </Routes>
    </Router>
  );
};
export default App;
