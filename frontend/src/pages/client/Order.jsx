import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { AgGridReact } from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-quartz.css';
import { checkAuth, getToken} from '../../authUtils';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/client/Navbar";
import Announcement from "../../components/client/Announcement";
import Footer from "../../components/client/Footer";

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 4;
  padding: 20px;
`;

const Order = styled.div`
  margin-bottom: 20px;
`;

const OrderPage = () => {
const { id } = useParams();
const [order, setOrder] = useState({});
const [productsList, setProductsList] = useState([]);
const navigate = useNavigate();
  const token = getToken();
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json', 
  };


useEffect(() => {
    checkAuth(navigate);
    const fetchData = async () => {
        try {
            const orderResponse = await axios.get(`http://localhost:5000/api/orders/${id}`,{headers});
            const order = orderResponse.data;

            const userResponse = await axios.get(`http://localhost:5000/api/users/find/${order.userId}`,{headers});
            const user = userResponse.data;

            const orderWithUserDetails = {
                ...order,
                userName: user.name,
                userEmail: user.email,
                userPhone: user.phone,
                userAddress: user.address,
            };

            if (order.coupon) {
                const couponResponse = await axios.get(`http://localhost:5000/api/coupons/${order.coupon}`,{headers});
                const coupon = couponResponse.data;
                setOrder({ ...orderWithUserDetails, couponCode: coupon.code, couponDiscount: coupon.discount });
            } else {
                setOrder(orderWithUserDetails);
            }

            const productsResponse = await axios.get("http://localhost:5000/api/products",{headers});

            const productsWithCategory = await Promise.all(productsResponse.data.map(async (product) => {
                const categoryResponse = await axios.get(`http://localhost:5000/api/categories/${product.category}`,{headers});
                const category = categoryResponse.data;
                return { ...product, category: category.name };
            }));

            const productsWithQuantities = order.products.map(orderProduct => {
                const matchingProduct = productsWithCategory.find(product => product._id === orderProduct.productId);
                return {
                  ...matchingProduct,
                  quantity: orderProduct.quantity,
                };
              });

              const orderedProducts = order.products.map(orderProduct => orderProduct.productId);
              const filteredProducts = productsWithQuantities.filter(product => orderedProducts.includes(product._id));  

            setProductsList(filteredProducts);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
}, [id, navigate]);

    const columns = [
        { field: "_id", headerName: "Id", width: 240, },
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
            field: "quantity",
            headerName: "Cantidad",
            width: 100,
        },
        {
            field: "_id",
            headerName: "Acciones",
            cellRenderer: (params) => {
                return (
                    <>
                        <Link to={`/product/${params.value}`}>
                            <FaEye />
                        </Link>
                    </>
                );
            },
            width: 100
        },
    ];


    return (
        <div>
            <Announcement />
      <Navbar />
            <Container>
                <MainContent>
                    <h1>Detalles del Pedido</h1>
                    <Order>
                        <p>Codigo: {order._id}</p>
                        <p>Estado: {order.status}</p>
                        <p>Catidad: {order.amount}</p>
                        <p>Direccion: {order.userAddress}</p>
                    </Order>
                    <Order>
                        <h2>Cupon</h2>
                        <p>Cupon: {order.couponCode}</p>
                        <p>Descuento: {order.couponDiscount}</p>
                    </Order>

                    <h2>Productos en el Pedido</h2>
                    <div
                        className="ag-theme-quartz"
                        style={{
                            height: '500px',
                        }}
                    >
                        <AgGridReact
                            rowData={productsList}
                            columnDefs={columns}
                            pagination={true}
                            paginationPageSize={20}
                        />
                    </div>
                </MainContent>
            </Container>
            <Footer/>
        </div>
    );
};

export default OrderPage;
