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
import { storage } from "../../firebase"
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { checkAdmin, getToken } from "../../authUtils";

const Container = styled.div`
display: flex;
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

  const navigate = useNavigate();
  const token = getToken();

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json', 
  };

  const [categoriesItems, setCategoriesItems] = useState([]);
  const [image, setImage] =useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories",{headers});
      setCategoriesItems(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    checkAdmin(navigate);
    fetchData();
    fetchImage();
  }, [navigate]);

  const fetchImage = async () => {
    try {
      const imageRef = ref(storage, "categories/");
      const response = await listAll(imageRef);
  
      const urls = await Promise.all(response.items.map(async (item) => {
        return getDownloadURL(item);
      }));
  
      setImage(urls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta categoria?");
    
    if (confirmDelete) {
      try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryId}`,{headers});
      
      const imageRefToDelete = ref(storage, `categories/${categoryId}`);
      await deleteObject(imageRefToDelete);
      
      fetchData();
      fetchImage();
      } catch (error) {
      }
    }
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 240,},
    {
      field: "_id",
      headerName: "Imagen",
      cellRenderer: (params) => {

    const categoryImage = image.find((img) => img.includes(params.value));

      return (
        <div>
          <CategoryListImg src={categoryImage} alt="Imagen" />
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
