import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("token");

      navigate("/");
    };

    logout();
  }, [navigate]);

  return null;
};

export default LogOut;