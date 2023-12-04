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
import { useNavigate } from 'react-router-dom';
import { checkAdmin, getToken } from "../../authUtils";

const Container = styled.div`
display: flex;
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

export default function CouponList() {
  const navigate = useNavigate();
  const token = getToken();

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json', 
  };

  const [couponsItems, setCouponsItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/coupons",{headers});
      setCouponsItems(response.data);
    } catch (error) {
      console.error("Error fetching coupons data:", error);
    }
  };

  useEffect(() => {
    checkAdmin(navigate);
    fetchData();
  }, [navigate]);

  const handleDelete = async (couponId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/coupons/${couponId}`,{headers});
        fetchData();
      } catch (error) {
        console.error(`Error al eliminar el usuario con ID ${couponId}:`, error);
      }
    }
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 240,},
    {
      field: "code",
      headerName: "Codigo",
      width: 250,
      filter: true,
    },
    {
      field: "discount",
      headerName: "Descuento",
      width: 250,
      filter: true,
    },
    {
      field: "_id",
      headerName: "Acciones",
      cellRenderer: (params) => {
        return (
          <>
            <Link to={`/admin/coupons/${params.value}`}>
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
        rowData={couponsItems}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={20}
      />
      </div>
      <StyledLink to="/admin/coupons/new">
      <Button>Agregar</Button>
      </StyledLink>
        </MainContent>
      </Container>
    </div>
  );
}
