import { Navigate } from "react-router-dom";

export const createToken = (accessToken) => {
  localStorage.setItem("token", accessToken);
  const creationTime = new Date().getTime();
  localStorage.setItem("tokenCreationTime", creationTime);
};

export const checkAuth = (navigate) => {
  const token = getToken();
  
  if (!token) {
    navigate("/login");
  } else {
    const creationTime = localStorage.getItem("tokenCreationTime");
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - creationTime;

    if (timeElapsed > 1800000) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenCreationTime");
      navigate("/login");
    }
  }
};

export const redirect = (navigate) => {
  const token = getToken();
  const decodeToken = JSON.parse(atob(token.split('.')[1]));
  const isAdmin = decodeToken&&decodeToken.isAdmin;
  if(!isAdmin){
    navigate('/profile');
  }else{
    navigate('/admin');
  }
}

export const checkAdmin = (navigate) => {
  const token = getToken();
  
  if (!token) {
    navigate("/login");
  } else {
    const creationTime = localStorage.getItem("tokenCreationTime");
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - creationTime;

    if (timeElapsed > 1800000) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenCreationTime");
      navigate("/login");
    }else{
      const decodeToken = JSON.parse(atob(token.split('.')[1]));
      const isAdmin = decodeToken&&decodeToken.isAdmin;
      if(!isAdmin){
        navigate('/');
      }
    }
  }
};

export const getToken = () => localStorage.getItem("token");

