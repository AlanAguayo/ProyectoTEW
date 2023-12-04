import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Topbar from "../../components/admin/Topbar"
import Sidebar from "../../components/admin/Sidebar"
import {AgGridReact} from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-quartz.css';
import { checkAdmin, getToken } from "../../authUtils";
import { useNavigate } from "react-router-dom";

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

const MainContent = styled.div`
  flex: 4;
  padding: 20px;
`;

export default function UserList() {
  const navigate = useNavigate();

  const token = getToken();

  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', 
  };
  const [usersItems, setUsersItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users",{headers});
      setUsersItems(response.data);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  useEffect(() => {
    checkAdmin(navigate);
    fetchData();
  }, [navigate]);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`,{headers});
        fetchData();
      } catch (error) {
        console.error(`Error al eliminar el usuario con ID ${userId}:`, error);
      }
    }
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 240,},
    {
      field: "name",
      headerName: "Nombre",
      width: 250,
      filter: true,
      renderCell: (params) => {
        return (
          <UserListUser>
            <UserListImg src={params.row.avatar} alt="" />
            {params.row.username}
          </UserListUser>
        );
      },
    },
    { field: "email", headerName: "Correo", width: 340},
    {
      field: "isAdmin",
      headerName: "Rol",
      width: 100,
      filter: 'agSetColumnFilter',
      cellRenderer: (params) => {
        if(params.value){
          return "Admin";
        }
        return "Cliente";
      }
    },
    {
      field: "phone",
      headerName: "Telefono",
      width: 100,
    },
    {
      field: "address",
      headerName: "Direccion",
      width: 100,
    },
    {
      field: "_id",
      headerName: "Acciones",
      cellRenderer: (params) => {
        return (
          <>
            <Link to={`/admin/users/${params.value}`}>
              <FaPencilAlt/>
            </Link>
            {" - "}
            <FaTrash onClick={() => handleDelete(params.value)}/>
          </>
        );
      },
      width: 100
    },
  ];

  return (
    <div>
      <Topbar />
      <Container>
        <Sidebar />
        <MainContent>
        <div
				className="ag-theme-quartz"
				style={{
					height: '500px',
				}}
			>
        <AgGridReact
        rowData={usersItems}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={20}
      />
      </div>
        </MainContent>
      </Container>
    </div>
  );
}
