import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { ip } from '../../constants.js';
import { getToken } from "../../authUtils";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://proyectotew.s3.amazonaws.com/2023-12-03_20-51.png")
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
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const navigate = useNavigate();
  const token = getToken();

  

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    birthday: "",
    country: "",
    street: "",
    city: "",
    state: "",
    cp: "",
    phone: "",
    password: "",
    isAdmin: false,
    img: "nouser.jpg"
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://"+ip+":5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(formData.email);
        const responseLogIn = await fetch("http://"+id+":5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: formData.password,
            email: formData.email,
          }),
        });
        if (responseLogIn.ok) {
          const responseDataLog = await responseLogIn.json();
          console.log(responseDataLog);
          const responseCart = await fetch("http://"+id+":5000/api/carts", {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${responseDataLog.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: responseData._id
            }),
          });
          if (responseCart.ok) {
            console.log("Registro exitoso");
            navigate("/login");
          }else{
            setError("Error en el registro");
          }
          }else{
            setError("Error en el registro");
          }

        
        

      } else {
        setError("Error en el registro");
      }
    } catch (error) {
      setError("Error en la solicitud:" + error.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Crea una cuenta</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Apellidos"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Correo"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Teléfono"
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="País"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Calle"
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Ciudad"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Estado"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Codigo Postal"
            type="number"
            name="cp"
            value={formData.cp}
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
          <Input
            placeholder="Confirmar contraseña"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Agreement>
            Creando una cuenta de lincestore aceptas los{" "}
            <b>terminos y condiciones</b>
          </Agreement>
          <Button type="submit">Registrarse</Button>
          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
