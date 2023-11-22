import { FaTrash } from "react-icons/fa";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Topbar from "../../components/admin/Topbar"
import Sidebar from "../../components/admin/Sidebar"
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

const Container = styled.div`
display: flex;
`;

const UserListUser = styled.div`
display: flex;
  align-items: center;
`;

const UserListImg = styled.img`
width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const UserListEdit = styled.button`
border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
`;

const MainContent = styled.div`
  flex: 4;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const UserListDelete = styled.button`
color: red;
    cursor: pointer;
`;

const TrashRenderer = (props) => (
  <FaTrash
    style={{ color: "red", cursor: "pointer" }}
    onClick={() => props.onClick(props.node.data.id)}
  />
);


const frameworkComponents = {
  trashRenderer: TrashRenderer,
};



export default function UserList() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "Id", width: 90 },
    {
      field: "user",
      headerName: "Nombre",
      width: 200,
      renderCell: (params) => {
        return (
          <UserListUser>
            <UserListImg src={params.row.avatar} alt="" />
            {params.row.username}
          </UserListUser>
        );
      },
    },
    { field: "email", headerName: "Correo", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transacciones",
      width: 160,
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <UserListEdit>Edit</UserListEdit>
            </Link>
            <FaTrash
              style={{
                color: "red",
                cursor: "pointer"
              }}
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Topbar />
      <Container>
        <Sidebar />
        <MainContent>
        <AgGridReact
        rowData={data}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={5}
        checkboxSelection={true}
        frameworkComponents={frameworkComponents}
      />
      <StyledLink to="/admin/users/new">
      <Button>Agregar</Button>
      </StyledLink>
      <br/>
      <br/>
        </MainContent>
      </Container>
    </div>
  );
}
