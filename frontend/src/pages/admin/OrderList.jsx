import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Topbar from "../../components/admin/Topbar"
import Sidebar from "../../components/admin/Sidebar"
import {AgGridReact} from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-quartz.css';
import { checkAdmin, getToken } from "../../authUtils";
import { useNavigate } from "react-router-dom";
import { ip } from '../../constants.js';

const Container = styled.div`
display: flex;
`;

const MainContent = styled.div`
  flex: 4;
  padding: 20px;
`;

export default function OrderList() {
  const navigate = useNavigate();

  const token = getToken();

  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', 
  };
  const [ordersItems, setOrdersItems] = useState([]);

  const fetchData = async () => {
    try {
      const ordersResponse = await axios.get("http://"+ip+":5000/api/orders",{headers});

      const ordersWithUser = await Promise.all(ordersResponse.data.map(async (order) => {
        const userResponse = await axios.get(`http://${ip}:5000/api/users/find/${order.userId}`,{headers});
        const user = userResponse.data;
        return { ...order, userId: user.email };
      }));

      const ordersWithCoupon = await Promise.all(ordersWithUser.map(async (order) => {
        if (order.coupon) {
          const couponResponse = await axios.get(`http://${ip}:5000/api/coupons/${order.coupon}`,{headers});
          const coupon = couponResponse.data;
          return { ...order, coupon: coupon.code };
        }
        return order;
      }));

      setOrdersItems(ordersWithCoupon);
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };

  useEffect(() => {
    checkAdmin(navigate);
    fetchData();
  }, [navigate]);

  const columns = [
    { field: "_id", headerName: "Id", width: 240,},
    {
      field: "userId",
      headerName: "Usuario",
      width: 250,
      filter: true,
    },
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
            <Link to={`/admin/orders/${params.value}`}>
              <FaEye/>
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
        <div
				className="ag-theme-quartz"
				style={{
					height: '500px',
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
    </div>
  );
}
