import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCallsAdmin";
import styled from "styled-components";
import Topbar from "../../components/admin/Topbar"
import Sidebar from "../../components/admin/Sidebar"
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { productRows } from '../../dummyData';

const Container = styled.div`
display: flex;
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

const MainContent = styled.div`
  flex: 4;
  padding: 20px;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const ProductListDelete = styled.div`
color: red;
  cursor: pointer;
`;

const TrashRenderer = (props) => ({}

);

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

export default function Coupons() {
  const [data, setData] = useState(productRows);

  const dispatch = useDispatch();
  //const products = useSelector((state) => state.product.products);

  useEffect(() => {
  //  getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

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
    { field: "inStock", headerName: "Cantidad", width: 200 },
    {
      field: "price",
      headerName: "Precio",
      width: 160,
    },
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
            <FaTrash 
              style={{color: "red", cursor: "pointer"}}
              onClick={() => handleDelete(params.row._id)}
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
      <StyledLink to="/admin/products/new">
      <Button>Agregar</Button>
      </StyledLink>
      <br/>
      <br/>
        </MainContent>
      </Container>
    </div>
  );
}
