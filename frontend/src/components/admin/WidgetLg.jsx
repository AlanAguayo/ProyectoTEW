import { useEffect, useState } from "react";
import {format} from "timeago.js"
import axios from "axios";
import styled from "styled-components";
import { getToken } from "../../authUtils";
import { ip } from '../../constants.js';

const Container = styled.div`
flex: 2;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
padding: 20px;
`;

const WidgetLgTitle = styled.h3`
font-size: 22px;
  font-weight: 600;
`;

const WidgetLgTable = styled.table`
width: 100%;
  border-spacing: 20px;
`;

const WidgetLgTh = styled.th`
text-align: left;
`;

const WidgetLgUser = styled.td`
display: flex;
  align-items: center;
  font-weight: 300;
`;

const WidgetLgDate = styled.td`
font-weight: 300;
`;

const WidgetLgAmount = styled.td`
font-weight: 300;
`;

const WidgetLgButton = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;

  &.approved {
    background-color: #e5faf2;
    color: #3bb077;
  }

  &.declined {
    background-color: #fff0f1;
    color: #d95087;
  }

  &.pending {
    background-color: #ebf1fe;
    color: #2a7ade;
  }
`;

export default function WidgetLg() {
  const token = getToken();

  const [orders, setOrders] = useState([]);

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json', 
  };

  const fetchData = async () => {
    try {
      const ordersResponse = await axios.get("http://"+ip+":5000/api/orders",{headers});

      const ordersWithUser = await Promise.all(ordersResponse.data.map(async (order) => {
        const userResponse = await axios.get(`http://${ip}:5000/api/users/find/${order.userId}`,{headers});
        const user = userResponse.data;
        return { ...order, userId: user.email };
      }));

      setOrders(ordersWithUser);
    } catch (error) {
      
        console.error("Error fetching orders data:", error);
      
      
    }
  };

  

  useEffect(() => {
    fetchData();
  }, []);

  const Button = ({ type }) => {
    return <WidgetLgButton className={type}>{type}</WidgetLgButton>;
  };

  return (
    <Container>
      <WidgetLgTitle>Transacciones</WidgetLgTitle>
      <WidgetLgTable>
        <tr>
          <WidgetLgTh>Usuario</WidgetLgTh>
          <WidgetLgTh>Fecha</WidgetLgTh>
          <WidgetLgTh>Cantidad</WidgetLgTh>
          <WidgetLgTh>Estado</WidgetLgTh>
        </tr>
        {orders.map((order) => (
          <tr key={order._id}>
            <WidgetLgUser>
              {order.userId}
            </WidgetLgUser>
            <WidgetLgDate>{format(order.createdAt)}</WidgetLgDate>
            <WidgetLgAmount>${order.amount}</WidgetLgAmount>
            <td>
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </WidgetLgTable>
    </Container>
  );
}
