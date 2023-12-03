import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {getToken } from "../../authUtils";





const Featured = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FeaturedItem = styled.div`
  flex: 1;
  margin: 0px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const FeaturedTitle = styled.span`
  font-size: 20px;
`;

const FeaturedMoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;

const FeaturedMoney = styled.span`
  font-size: 30px;
  font-weight: 600;
`;

const FeaturedMoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const FeaturedSub = styled.span`
  font-size: 15px;
  color: gray;
`;

export default function FeaturedInfo() {
  const token = getToken();
  const [userCountThisMonth, setUserCountThisMonth] = useState(0);
  const [userCountLastMonth, setUserCountLastMonth] = useState(0);
  const [salesAmountThisMonth, setSalesAmountThisMonth] = useState(0);
  const [salesAmountLastMonth, setSalesAmountLastMonth] = useState(0);
  const [orderCountThisMonth, setOrderCountThisMonth] = useState(0);
  const [orderCountLastMonth, setOrderCountLastMonth] = useState(0);

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json', 
  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        // Usuarios
        const usersRes = await axios.get("http://localhost:5000/api/users",{headers});
        const currentMonth = new Date().getMonth() + 1;
        const usersThisMonth = usersRes.data.filter((user) => {
          const registrationMonth = new Date(user.createdAt).getMonth() + 1;
          return registrationMonth === currentMonth;
        });
        const usersLastMonth = usersRes.data.filter((user) => {
          const registrationMonth = new Date(user.createdAt).getMonth() + 1;
          return registrationMonth === currentMonth - 1;
        });
        setUserCountThisMonth(usersThisMonth.length);
        setUserCountLastMonth(usersLastMonth.length);

        // Ventas
        const salesRes = await axios.get("http://localhost:5000/api/orders",{headers});

        const salesThisMonth = salesRes.data.filter((sale) => {
          const saleMonth = new Date(sale.createdAt).getMonth() + 1;
          return saleMonth === currentMonth;
        });

        const salesLastMonth = salesRes.data.filter((sale) => {
          const saleMonth = new Date(sale.createdAt).getMonth() + 1;
          return saleMonth === currentMonth - 1;
        });

        const calculateTotalAmount = (sales) =>
          sales.reduce((total, sale) => total + sale.amount, 0);

        setSalesAmountThisMonth(calculateTotalAmount(salesThisMonth));
        setSalesAmountLastMonth(calculateTotalAmount(salesLastMonth));

        // Pedidos
        const ordersRes = await axios.get("http://localhost:5000/api/orders",{headers});

        const ordersThisMonth = ordersRes.data.filter((order) => {
          const orderMonth = new Date(order.createdAt).getMonth() + 1;
          return orderMonth === currentMonth;
        });

        const ordersLastMonth = ordersRes.data.filter((order) => {
          const orderMonth = new Date(order.createdAt).getMonth() + 1;
          return orderMonth === currentMonth - 1;
        });

        setOrderCountThisMonth(ordersThisMonth.length);
        setOrderCountLastMonth(ordersLastMonth.length);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Featured>
      <FeaturedItem>
        <FeaturedTitle>Usuarios</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>{userCountThisMonth}</FeaturedMoney>
          <FeaturedMoneyRate>
            {userCountThisMonth - userCountLastMonth}{" "}
            {userCountThisMonth - userCountLastMonth < 0 ? (
              <FaArrowLeft
                style={{ fontSize: "14px", marginLeft: "5px", color: "red" }}
              />
            ) : (
              <FaArrowRight
                style={{ fontSize: "14px", marginLeft: "5px", color: "green" }}
              />
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Comparado al mes pasado</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Ventas</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>${salesAmountThisMonth}</FeaturedMoney>
          <FeaturedMoneyRate>
            {salesAmountThisMonth - salesAmountLastMonth}{" "}
            {salesAmountThisMonth - salesAmountLastMonth < 0 ? (
              <FaArrowLeft
                style={{ fontSize: "14px", marginLeft: "5px", color: "red" }}
              />
            ) : (
              <FaArrowRight
                style={{ fontSize: "14px", marginLeft: "5px", color: "green" }}
              />
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Comparado al mes pasado</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Pedidos</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>{orderCountThisMonth}</FeaturedMoney>
          <FeaturedMoneyRate>
            {orderCountThisMonth - orderCountLastMonth}{" "}
            {orderCountThisMonth - orderCountLastMonth < 0 ? (
              <FaArrowLeft
                style={{ fontSize: "14px", marginLeft: "5px", color: "red" }}
              />
            ) : (
              <FaArrowRight
                style={{ fontSize: "14px", marginLeft: "5px", color: "green" }}
              />
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Comparado al mes pasado</FeaturedSub>
      </FeaturedItem>
    </Featured>
  );
}
