import styled from "styled-components";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { checkAdmin, getToken } from "../../authUtils";
import { ip } from '../../constants.js';

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 4;
`;

const NewUserForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const NewUserItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;

const NewUserItemLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;

const NewUserItemInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const NewUserGenderInput = styled.input`
  margin-top: 15px;
`;

const NewUserGenderLabel = styled.label`
  margin: 10px;
  font-size: 18px;
  color: #555;
`;

const NewUserButton = styled.button`
  width: 200px;
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
`;

const NewUser = () => {
  const navigate = useNavigate();

  const token = getToken();

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json', 
  };
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    isAdmin: true,
  });

  useEffect(() => {
    checkAdmin(navigate);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://${ip}:5000/api/users/find/${id}`,{headers});
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id], [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        isAdmin: value === "true",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCreateUser = async () => {
    try {
      if (id) {
        await axios.put(`http://${ip}:5000/api/users/${id}`, formData,{headers});
      }
      navigate("/admin/users");
    } catch (error) {
      console.error("Error al crear/editar usuario:", error);
    }
  };

  return (
    <div>
      <Topbar />
      <Container>
        <Sidebar />
        <MainContent>
          <h1>Usuario</h1>
          <NewUserForm>
            <NewUserItem>
              <NewUserItemLabel>Nombre</NewUserItemLabel>
              <NewUserItemInput
                type="text"
                placeholder="Jaime Perez"
                value={formData.name || ""}
                onChange={handleInputChange}
                name="name"
              />
            </NewUserItem>
            <NewUserItem>
              <NewUserItemLabel>Email</NewUserItemLabel>
              <NewUserItemInput
                type="email"
                placeholder="correo@gmail.com"
                onChange={handleInputChange}
                value={formData.email || ""}
                name="email"
              />
            </NewUserItem>
            <NewUserItem>
              <NewUserItemLabel>Contraseña</NewUserItemLabel>
              <NewUserItemInput
                type="password"
                placeholder="Contraseña"
                value={formData.password || ""}
                onChange={handleInputChange}
                name="password"
              />
            </NewUserItem>
            <NewUserItem>
              <NewUserItemLabel>Telefono</NewUserItemLabel>
              <NewUserItemInput
                type="text"
                placeholder="+1 123 456 78"
                onChange={handleInputChange}
                value={formData.phone || ""}
                name="phone"
              />
            </NewUserItem>
            <NewUserItem>
              <NewUserItemLabel>Direccion</NewUserItemLabel>
              <NewUserItemInput
                type="text"
                placeholder="New York | USA"
                onChange={handleInputChange}
                value={formData.address || ""}
                name="address"
              />
            </NewUserItem>
            <NewUserItem>
              <NewUserItemLabel>Rol</NewUserItemLabel>
              <div>
                <NewUserGenderInput
                  type="radio"
                  name="role"
                  id="admin"
                  value="true"
                  checked={formData.isAdmin}
                  onChange={handleInputChange}
                />
                <NewUserGenderLabel for="admin">Administrador</NewUserGenderLabel>
                <NewUserGenderInput
                  type="radio"
                  name="role"
                  id="client"
                  value="false"
                  checked={!formData.isAdmin}
                  onChange={handleInputChange}
                />
                <NewUserGenderLabel for="client">Cliente</NewUserGenderLabel>
              </div>
            </NewUserItem>
          </NewUserForm>
          <NewUserButton className="newUserButton" onClick={handleCreateUser}>
            Guardar
          </NewUserButton>
        </MainContent>
      </Container>
    </div>
  );
};

export default NewUser;
