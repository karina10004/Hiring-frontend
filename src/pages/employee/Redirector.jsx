import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Redirector = () => {
  const { processId, interviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("processId", processId);
    localStorage.setItem("interviewId", interviewId);
    navigate("/employeelogin");
  }, []);

  return (
    // spinner lana hai yha pe
    <div>Redirector</div>
  );
};

export default Redirector;
