import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import {format} from "timeago.js"
import styled from "styled-components";

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

const WidgetLgImg = styled.img`
width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
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
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users");
        // Crea un objeto de usuarios para mapear IDs de usuarios a nombres y correos electrónicos
        const userMap = {};
        res.data.forEach((user) => {
          userMap[user._id] = { name: user.name, email: user.email };
        });
        setUsers(userMap);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
        getUsers();
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
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
              {users[order.userId]?.email}
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
