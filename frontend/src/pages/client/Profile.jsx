import { Link } from "react-router-dom";
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
import { Button } from "react-bootstrap";

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

const UserShowUserTitle = styled.span`
  font-weight: 300;
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
  return (
    <>
    <Navbar />
      <Announcement />
    <User>
      <UserTitleContainer>
        <h1>Perfil</h1>
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserShowImg
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <UserShowTopTitle>
              <UserShowUsername>Alan Aguayo</UserShowUsername>
              <UserShowUserTitle>Usuario</UserShowUserTitle>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowTitle>Informacion de la cuenta</UserShowTitle>
            <UserShowInfo>
              <FaUser/>
              <UserShowInfoTitle>19030034@itcelaya.edu.mx</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
             <FaCalendar/> 
              <UserShowInfoTitle>31/10/2000</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfoTitle>Informacion de contacto</UserShowInfoTitle>
            <UserShowInfo>
              <FaPhone/>
              <UserShowInfoTitle>+52 123 123 1212</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <FaLocationArrow/>
              <UserShowInfoTitle>Mexico | Celaya | Mi direccion</UserShowInfoTitle>
            </UserShowInfo>
          </UserShowBottom>
          <FaStore/>
          <UserShowInfoTitle to= "orders">
            <Link to="/orders">
            Historial de compras
            </Link>
          </UserShowInfoTitle>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>Editar</UserUpdateTitle>
          <UserUpdateForm>
            <div>
              <UserUpdateItem>
                <UserUpdateItemLabel>Correo</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder="19030034@itcelaya.edu.mx"
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Nombre</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder="Alan Aguayo"
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Telefono</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder="+52 123 123 1212"
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Direccion</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder="Calle #000"
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Pais</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder="Mexico"
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserUpdateItemLabel>Estado</UserUpdateItemLabel>
                <UserUpdateInput
                  type="text"
                  placeholder="Guanajuato"
                />
              </UserUpdateItem>
            </div>
            <UserUpdateRight>
              <UserUpdateUpload>
                <UserUpdateImg
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                <FaUpload/>
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </UserUpdateUpload>
              <UserUpdateButton>Update</UserUpdateButton>
            </UserUpdateRight>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </User>
    </>
  );
}
