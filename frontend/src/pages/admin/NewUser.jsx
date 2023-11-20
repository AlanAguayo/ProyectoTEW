import styled from "styled-components";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";

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

const NewUserSelect = styled.select`
height: 40px;
    border-radius: 5px;
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

export default function NewUser() {
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
          <NewUserItemInput type="text" placeholder="Jaime Perez" />
        </NewUserItem>
        <NewUserItem>
          <NewUserItemLabel>Email</NewUserItemLabel>
          <NewUserItemInput type="email" placeholder="correo@gmail.com" />
        </NewUserItem>
        <NewUserItem>
          <NewUserItemLabel>Contraseña</NewUserItemLabel>
          <NewUserItemInput type="password" placeholder="Contraseña" />
        </NewUserItem>
        <NewUserItem>
          <NewUserItemLabel>Telefono</NewUserItemLabel>
          <NewUserItemInput type="text" placeholder="+1 123 456 78" />
        </NewUserItem>
        <NewUserItem>
          <NewUserItemLabel>Direccion</NewUserItemLabel>
          <NewUserItemInput type="text" placeholder="New York | USA" />
        </NewUserItem>
        <NewUserItem>
          <NewUserItemLabel>Genero</NewUserItemLabel>
          <div>
            <NewUserGenderInput type="radio" name="gender" id="male" value="male" />
            <NewUserGenderLabel for="male">Male</NewUserGenderLabel>
            <NewUserGenderInput type="radio" name="gender" id="female" value="female" />
            <NewUserGenderLabel for="female">Female</NewUserGenderLabel>
            <NewUserGenderInput type="radio" name="gender" id="other" value="other" />
            <NewUserGenderLabel for="other">Other</NewUserGenderLabel>
          </div>
        </NewUserItem>
        <NewUserItem>
          <NewUserItemLabel>Activo</NewUserItemLabel>
          <NewUserSelect name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </NewUserSelect>
        </NewUserItem>
        <NewUserItem>
          <NewUserItemLabel>Rol</NewUserItemLabel>
          <div>
            <NewUserGenderInput type="radio" name="gender" id="male" value="male" />
            <NewUserGenderLabel for="male">Administrador</NewUserGenderLabel>
            <NewUserGenderInput type="radio" name="gender" id="female" value="female" />
            <NewUserGenderLabel for="female">Cliente</NewUserGenderLabel>
          </div>
        </NewUserItem>
      </NewUserForm>
      <NewUserButton className="newUserButton">Create</NewUserButton>
      </MainContent>
    </Container>
    </div>
  );
}
