import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Topbar from "../../components/admin/Topbar";
import Sidebar from "../../components/admin/Sidebar";
import { AgGridReact } from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-quartz.css';

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

const OrderDetails = styled.div`
  margin-bottom: 20px;
`;

const ProductsGrid = styled.div`
  height: 400px;
  width: 100%;
`;

const OrderDetailsPage = () => {
    const { id } = useParams();
const [orderDetails, setOrderDetails] = useState({});
const [productsList, setProductsList] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const orderResponse = await axios.get(`http://localhost:5000/api/orders/${id}`);
            const order = orderResponse.data;

            const userResponse = await axios.get(`http://localhost:5000/api/users/find/${order.userId}`);
            const user = userResponse.data;

            const orderWithUserDetails = {
                ...order,
                userName: user.name,
                userEmail: user.email,
                userImg: user.img,
                userPhone: user.phone,
                userAddress: user.address,
            };

            if (order.coupon) {
                const couponResponse = await axios.get(`http://localhost:5000/api/coupons/${order.coupon}`);
                const coupon = couponResponse.data;
                setOrderDetails({ ...orderWithUserDetails, couponCode: coupon.code, couponDiscount: coupon.discount });
            } else {
                setOrderDetails(orderWithUserDetails);
            }

            const productsResponse = await axios.get("http://localhost:5000/api/products");

            const productsWithCategory = await Promise.all(productsResponse.data.map(async (product) => {
                const categoryResponse = await axios.get(`http://localhost:5000/api/categories/${product.category}`);
                const category = categoryResponse.data;
                return { ...product, category: category.name };
            }));

            const orderedProducts = order.products.map(orderProduct => orderProduct.productId);
            const filteredProducts = productsWithCategory.filter(product => orderedProducts.includes(product._id));

            setProductsList(filteredProducts);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
}, [id]);

    const columns = [
        { field: "_id", headerName: "Id", width: 240, },
        {
            field: "image",
            headerName: "Imagen",
            cellRenderer: (params) => {
                const imageUrl = params.value && params.value.length > 0 ? params.value[0] : null;

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
            width: 100
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
            <Topbar />
            <Container>
                <Sidebar />
                <MainContent>
                    <h1>Detalles del Pedido</h1>
                    <OrderDetails>
                        <p>Codigo: {orderDetails._id}</p>
                        <p>Estado: {orderDetails.status}</p>
                        <p>Catidad: {orderDetails.amount}</p>
                    </OrderDetails>
                    <OrderDetails>
                        <h2>Usuario</h2>
                        <p>Nombre: {orderDetails.userName}</p>
                        <p>Email: {orderDetails.userEmail}</p>
                        <p>Imagen: {orderDetails.userImg}</p>
                        <p>Telefono: {orderDetails.userPhone}</p>
                        <p>Direccion: {orderDetails.userAddress}</p>
                        <p>Cantidad: {orderDetails.amount}</p>
                        <p>Dirección: {orderDetails.address}</p>
                    </OrderDetails>
                    <OrderDetails>
                        <h2>Cupon</h2>
                        <p>Cupon: {orderDetails.couponCode}</p>
                        <p>Descuento: {orderDetails.couponDiscount}</p>
                    </OrderDetails>

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
        </div>
    );
};

export default OrderDetailsPage;
