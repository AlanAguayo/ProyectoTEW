import { useState } from "react";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import "./login.css"
import {Link} from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">SIGN IN</h1>
        <form className="form">
          <input className="inputText"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input className="inputText"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleClick} disabled={isFetching}>
            LOGIN
          </button>
          {error && <span className="error">Something went wrong...</span>}
          <Link className="textButton" to={"/recover"}>Olvide la constraseña</Link>
          <Link className="textButton" to={"/register"}>Crear una cuenta</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
