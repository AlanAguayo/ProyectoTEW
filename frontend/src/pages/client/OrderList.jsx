import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { AgGridReact } from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-quartz.css';
import { checkAuth, getToken } from '../../authUtils';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/client/Navbar";
import Announcement from "../../components/client/Announcement";
import Footer from "../../components/client/Footer";
import Chart from "../../components/Chart";

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 4;
  padding: 20px;
`;

export default function OrderList() {
  const [ordersItems, setOrdersItems] = useState([]);
  const navigate = useNavigate();
  const token = getToken();
  const id = localStorage.getItem('id');
  const [orderData, setOrderData] = useState([])

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const fetchData = async () => {
    try {
      const ordersResponse = await axios.get(`http://localhost:5000/api/orders/find/${id}`, { headers });
      const orderList = ordersResponse.data;

      const updatedOrderList = await Promise.all(orderList.map(async (order) => {
        if (order.coupon) {
          const couponResponse = await axios.get(`http://localhost:5000/api/coupons/${order.coupon}`, { headers });
          const couponCode = couponResponse.data.code;
          return { ...order, coupon: couponCode };
        } else {
          return order;
        }
      }));

      setOrdersItems(updatedOrderList);

        const monthlyData = {};
        ordersResponse.data.forEach((order) => {
          const month = new Date(order.createdAt).getMonth() + 1;
          if (!monthlyData[month]) {
            monthlyData[month] = 0;
          }
          monthlyData[month] += order.amount;
        });

        const chartData = Object.keys(monthlyData).map((month) => ({
          month: `Month ${month}`,
          amount: monthlyData[month],
        }));

        setOrderData(chartData);
      

    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };

  useEffect(() => {
    checkAuth(navigate);
    fetchData();
  }, [navigate]);

  const columns = [
    { field: "_id", headerName: "Id", width: 240, },
    {
      field: "amount",
      headerName: "Cantidad",
      width: 250,
      filter: true,
    },
    {
      field: "address",
      headerName: "Direccion",
      width: 250,
      filter: true,
    },
    {
      field: "status",
      headerName: "Estado",
      width: 250,
      filter: true,
    },
    {
      field: "coupon",
      headerName: "Cupon",
      width: 250,
      filter: true,
    },
    {
      field: "_id",
      headerName: "Acciones",
      cellRenderer: (params) => {
        return (
          <>
            <Link to={`/orders/${params.value}`}>
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
        <Chart data={orderData} title="Compras por Mes" grid dataKey="amount" />
          <div
            className="ag-theme-quartz"
            style={{
              height: '300px',
            }}
          >
            <AgGridReact
              rowData={ordersItems}
              columnDefs={columns}
              pagination={true}
              paginationPageSize={20}
            />
          </div>
        </MainContent>
      </Container>
      <Footer />
    </div>
  );
}
