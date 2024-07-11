import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RegistrationLinkHandler = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      localStorage.setItem("registrationToken", token);
    }

    navigate("/login");
  }, [token]);

  return (
    <div>
      <p>Redirecting to login page...</p>
      {/* You can add a loading spinner or message here if needed */}
    </div>
  );
};

export default RegistrationLinkHandler;
