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

const Container = styled.div`
display: flex;
`;

const CategoryListCategory = styled.div`
display: flex;
  align-items: center;
`;

const CategoryListImg = styled.img`
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

export default function CategoryList() {
  const [categoriesItems, setCategoriesItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategoriesItems(response.data);
    } catch (error) {
      console.error("Error fetching categories data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${categoryId}`);
        fetchData();
      } catch (error) {
        console.error(`Error al eliminar el usuario con ID ${categoryId}:`, error);
      }
    }
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 240,},
    {
      field: "image",
      headerName: "Imagen",
      cellRenderer: (params) => {
    return (
      <div>
        {
          <CategoryListCategory>
            <CategoryListImg src={params.value} alt="Imagen" />
          </CategoryListCategory>
        }
      </div>
    );
    
      },
      width: 100
    },
    {
      field: "name",
      headerName: "Nombre",
      width: 250,
      filter: true,
    },
    {
      field: "_id",
      headerName: "Acciones",
      cellRenderer: (params) => {
        return (
          <>
            <Link to={`/admin/categories/${params.value}`}>
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
        rowData={categoriesItems}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={20}
      />
      </div>
      <StyledLink to="/admin/categories/new">
      <Button>Agregar</Button>
      </StyledLink>
        </MainContent>
      </Container>
    </div>
  );
}
