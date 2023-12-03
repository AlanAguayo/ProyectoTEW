import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("img");
      localStorage.removeItem("birthday");
      localStorage.removeItem("phone");
      localStorage.removeItem("address"); 
      localStorage.removeItem("isAdmin"); 
      localStorage.removeItem("token");
      navigate("/");
    };

    logout();
  }, [navigate]);

  return null;
};

export default LogOut;