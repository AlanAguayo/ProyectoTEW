import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../../components/client/Navbar"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { userData } from "../../dummyData";
import { useNavigate } from 'react-router-dom';
import Chart from "../../components/Chart";
import { checkAuth, getToken } from "../../authUtils";
import axios from "axios";

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

const ProductListEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;

const ProductListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductListDelete = styled.div`
  color: red;
  cursor: pointer;
`;

const TrashRenderer = (props) => ({});

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const frameworkComponents = {
  trashRenderer: TrashRenderer,
};

export default function OrderList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const id = localStorage.getItem('id');
  
  const fetchData = async () => {
    try {
      const token = getToken();
  
      const response = await axios.get(`http://localhost:5000/api/orders/find/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setData(response.data); 
    } catch (error) {
      console.error("Error fetching orders data:", error);
  
      // Log the response data if available
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  }
  
  useEffect(() => {
    checkAuth(navigate);
    fetchData();
  }, [navigate]);

  const columns = [
    { field: "_id", headerName: "Id", width: 220 },
    {
      field: "product",
      headerName: "Producto",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductListItem>
            <ProductListImg src={params.row.img} alt="" />
            {params.row.title}
          </ProductListItem>
        );
      },
    },
    /*{ 
      field: "quantity", 
      headerName: "Cantidad", 
      width: 200,
      renderCell: (params) => params.row.products[0].quantity,
    },*/
    {
      field: "amount",
      headerName: "Monto",
      width: 160,
    },
    {
      field: "status",
      headerName: "Estado",
      width: 160,
    },
    {/*
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <ProductListEdit>Edit</ProductListEdit>
            </Link>

          </>
        );
      },
    },
    */}
  ];

  return (
    <div>
      <Navbar />
      <Container>
        <MainContent>
          <AgGridReact
            rowData={data}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={5}
            checkboxSelection={true}
            frameworkComponents={frameworkComponents}
          />
          <Chart
            data={userData}
            title="Compras"
            grid
            dataKey="Active User"
          />
        </MainContent>
      </Container>
    </div>
  );
}