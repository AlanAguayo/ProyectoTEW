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
import { storage } from "../../firebase";
import { ref, getDownloadURL } from 'firebase/storage';
import { checkAdmin, getToken } from "../../authUtils";
import { useNavigate } from "react-router-dom";
import { ip } from '../../constants.js';

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

const UserImage = ({ imageUrl, altText, size }) => (
    <ProductListProduct>
      <ProductListImg src={imageUrl} alt={altText} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }}/>
    </ProductListProduct>
  );

const OrderDetailsPage = () => {
    const navigate = useNavigate();

    const token = getToken();

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', 
    };
    const { id } = useParams();
const [orderDetails, setOrderDetails] = useState({});
const [productsList, setProductsList] = useState([]);
const [userImage, setUserImage] = useState("");


useEffect(() => {
    checkAdmin(navigate);
    const fetchData = async () => {
        try {
            const orderResponse = await axios.get(`http://${ip}:5000/api/orders/${id}`,{headers});
            const order = orderResponse.data;

            const userResponse = await axios.get(`http://${ip}:5000/api/users/find/${order.userId}`,{headers});
            const user = userResponse.data;

            const orderWithUserDetails = {
                ...order,
                userName: user.name,
                userEmail: user.email,
                userPhone: user.phone,
                userAddress: user.address,
            };

            if (order.coupon) {
                const couponResponse = await axios.get(`http://${ip}:5000/api/coupons/${order.coupon}`,{headers});
                const coupon = couponResponse.data;
                setOrderDetails({ ...orderWithUserDetails, couponCode: coupon.code, couponDiscount: coupon.discount });
            } else {
                setOrderDetails(orderWithUserDetails);
            }

            const productsResponse = await axios.get("http://"+ip+":5000/api/products",{headers});

            const productsWithCategory = await Promise.all(productsResponse.data.map(async (product) => {
                const categoryResponse = await axios.get(`http://${ip}:5000/api/categories/${product.category}`,{headers});
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


        const userImageRef = ref(storage, `users/${user._id}.jpg`);
        const userImageUrl = await getDownloadURL(userImageRef);
        setUserImage(userImageUrl);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
}, [id],[navigate]);

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
                        <UserImage imageUrl={userImage} altText="Imagen de usuario" size={64}/>
                        <p>Nombre: {orderDetails.userName}</p>
                        <p>Email: {orderDetails.userEmail}</p>
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
