import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaLocationArrow,
  FaMailBulk,
  FaUser,
  FaPhone,
  FaUpload,
  FaCalendar,
  FaStore
} from "react-icons/fa";
import styled from "styled-components";
import Navbar from "../../components/client/Navbar";
import Announcement from "../../components/client/Announcement";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { checkAuth, getToken } from "../../authUtils";
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from "../../firebase"

const User = styled.div`
  flex: 4;
  padding: 20px;
`;

const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserAddButton = styled.div`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
`;

const UserContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const UserUpdate = styled.div`
  flex: 2;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;

const UserShowImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserShowUsername = styled.span`
font-weight: 600;
`;

const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;

const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;

const UserShowInfoTitle = styled.span`
  margin-left: 10px;
`;

const UserUpdateTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const UserUpdateForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const UserUpdateItemLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`;

const UserUpdateInput = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;

const UserUpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserUpdateUpload = styled.div`
  display: flex;
  align-items: center;
`;

const UserUpdateImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const UserUpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
`;

export default function Profile() {
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  const email = useSelector((state) => state.user.currentUser?.email);  
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');
  const birthday = localStorage.getItem('birthday');
  const phone = localStorage.getItem('phone');
  const country = localStorage.getItem('country');
  const street = localStorage.getItem('street');
  const city = localStorage.getItem('city');
  const state = localStorage.getItem('state');
  const cp = localStorage.getItem('cp');
  const img = localStorage.getItem('img');
  const token = getToken();
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    email: email==="undefined" ? "" : email, 
    name: name ==="undefined" ? "" : name,
    lastName: lastName ==="undefined" ? "" : lastName,
    birthday: birthday ==="undefined" ? "" : birthday,
    phone: phone || 0,
    country: country ==="undefined" ? "" : country,
    street: street ==="undefined" ? "" : street,
    city: city ==="undefined" ? "" : city,
    state: state ==="undefined" ? "" : state,
    cp: cp || 0,
  });
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview("");
    }

    setImage(selectedImage);
  };
  

  useEffect(() => {
    checkAuth(navigate);
  }, [navigate]);
  
  const handleUpdate = async () => {    
    try {
      console.log("FormData:", formData);

      if(image==null){
        
      }else{
        const imageRef = ref(storage, `users/${id}.jpg`)
        uploadBytes(imageRef, image);
        localStorage.setItem('img', imagePreview);
      }

      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Actualización exitosa");
        localStorage.setItem('email', formData.email);
        localStorage.setItem('name', formData.name);
        localStorage.setItem('lastName', formData.lastName);
        localStorage.setItem('birthday', formData.birthday);
        localStorage.setItem('phone', formData.phone);
        localStorage.setItem('country', formData.country);
        localStorage.setItem('street', formData.street);
        localStorage.setItem('city', formData.city);
        localStorage.setItem('state', formData.state);
        localStorage.setItem('cp', formData.cp);

        navigate("/profile");
      } else {
        console.error("Error en la actualización:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };
  
  
  return (
    <>
    <Announcement />
    <Navbar />
      
    <User>
      <UserTitleContainer>
        <h1>Perfil</h1>
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserShowImg
              src={`${img}`}
              alt="Imagen del usuario"
            />
            <UserShowTopTitle>
              <UserShowUsername>{name+' '+lastName}</UserShowUsername>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowTitle>Informacion de la cuenta</UserShowTitle>
            <UserShowInfo>
              <FaUser/>
              <UserShowInfoTitle>{email}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
             <FaCalendar/> 
              <UserShowInfoTitle>{birthday? birthday : 'Cumpleaños no registrado'}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfoTitle>Informacion de contacto</UserShowInfoTitle>
            <UserShowInfo>
              <FaPhone/>
              <UserShowInfoTitle>{phone? phone : 'Teléfono no registrado'}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <FaLocationArrow/>
              <UserShowInfoTitle>{street+', '+city+', '+state+', '+country+', '+cp}</UserShowInfoTitle>
            </UserShowInfo>
          </UserShowBottom>
          <FaStore/>
          <UserShowInfoTitle to= "orders">
            <Link to="/orders">
            Historial de compras
            </Link>
          </UserShowInfoTitle>
          <UserShowInfo>
            <Link to="/logout">Cerrar sesión</Link>
          </UserShowInfo>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>Editar</UserUpdateTitle>
          <UserUpdateForm>
            <div>              
              <UserUpdateItem>
                <UserUpdateItemLabel>Nombre</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder={`${name}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Apellidos</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder={`${lastName}`}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Correo</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder={`${email}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Cumpleaños</UserUpdateItemLabel>
                <UserUpdateInput
                  type="date"
                  placeholder={`${birthday}`}
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Telefono</UserUpdateItemLabel>
                <UserUpdateInput
                  type="number"
                  placeholder={`${phone}`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Pais</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder={`${country}`}
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Calle</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder={`${street}`}
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Ciudad</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder={`${city}`}
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Estado</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder={`${state}`}
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Código Postal</UserUpdateItemLabel>
                <UserUpdateInput
                  type="number"
                  placeholder={`${cp}`}
                  name="cp"
                  value={formData.cp}
                  onChange={handleChange}
                />
              </UserUpdateItem>
            </div>
            <UserUpdateRight>
              <UserUpdateUpload>
                <UserUpdateImg
                  src={imagePreview || `${img}`}
                  alt="Imagen del usuario"
                />
                <label htmlFor="file">
                <FaUpload/>
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={handleImageChange} />
              </UserUpdateUpload>
              <UserUpdateButton onClick={handleUpdate}>Update</UserUpdateButton>
            </UserUpdateRight>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </User>
    </>
  );
}
