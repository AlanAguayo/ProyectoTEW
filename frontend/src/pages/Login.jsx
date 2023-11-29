import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-gray-solid-color-simple-background-image_557028.jpg")
  center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 10px 0px;
  padding: 10px;
`;

const Link = styled.a`
  margin: 15px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: blue;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 55px; 
`;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;

        localStorage.setItem("token", accessToken);
        console.log("Inicio de sesión exitoso");
        navigate('/profile');
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error en la solicitud: " + error.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Iniciar sesión</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Correo"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Link>Crear una cuenta</Link>
          <Button type="submit">Iniciar sesión</Button>
          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
