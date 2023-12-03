import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Topbar from "../../components/admin/Topbar";
import Sidebar from "../../components/admin/Sidebar";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";

const Container = styled.div`
  display: flex;
`;

const ProductListProduct = styled.div`
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

export default function ProductList() {
  const [productsItems, setProductsItems] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  const fetchData = async () => {
    try {
      const productsResponse = await axios.get("http://localhost:5000/api/products");

      const productsWithCategory = await Promise.all(
        productsResponse.data.map(async (product) => {
          const categoryResponse = await axios.get(
            `http://localhost:5000/api/categories/${product.category}`
          );
          const category = categoryResponse.data;
          return { ...product, category: category.name };
        })
      );

      setProductsItems(productsWithCategory);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  useEffect(() => {
    const fetchImagesForProducts = async () => {
      const imageUrlsMap = {};
      for (const product of productsItems) {
        const imageUrl = await fetchImage(product._id);
        imageUrlsMap[product._id] = imageUrl;
      }
      setImageUrls(imageUrlsMap);
    };

    fetchImagesForProducts();
    fetchData();
  }, [productsItems]);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar el producto?");

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);

        fetchData();
      } catch (error) {
        console.error(`Error al eliminar el producto con ID ${productId}:`, error);
      }
    }
  };

  const fetchImage = async (idProduct) => {
    try {
      const imageRef = ref(storage, `products/${idProduct}/1.jpg`);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching images:", error);
      return null;
    }
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 240 },
    {
      field: "_id",
      headerName: "Imagen",
      cellRenderer: (params) => {
        const imageUrl = imageUrls[params.value];
        return (
          <div>
            {imageUrl && (
              <ProductListProduct>
                <ProductListImg src={imageUrl} alt="Primera Imagen" />
              </ProductListProduct>
            )}
          </div>
        );
      },
      width: 100,
    },
    {
      field: "name",
      headerName: "Nombre",
      width: 250,
      filter: true,
    },
    { field: "desc", headerName: "Descripcion", width: 340 },
    {
      field: "category",
      headerName: "Categoria",
      width: 100,
    },
    {
      field: "size",
      headerName: "Tamaño",
      width: 100,
    },
    {
      field: "color",
      headerName: "Color",
      width: 100,
    },
    {
      field: "price",
      headerName: "Precio",
      width: 100,
    },
    {
      field: "_id",
      headerName: "Acciones",
      cellRenderer: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.value}`}>
              <FaPencilAlt />
            </Link>
            {" - "}
            <FaTrash onClick={() => handleDelete(params.value)} />
          </>
        );
      },
      width: 100,
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
              height: "500px",
            }}
          >
            <AgGridReact rowData={productsItems} columnDefs={columns} pagination={true} paginationPageSize={20} />
          </div>
          <StyledLink to="/admin/products/new">
            <Button>Agregar</Button>
          </StyledLink>
        </MainContent>
      </Container>
    </div>
  );
}
