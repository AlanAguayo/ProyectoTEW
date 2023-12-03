import Chart from "../../components/Chart";
import FeaturedInfo from "../../components/admin/FeaturedInfo";
import WidgetSm from "../../components/admin/WidgetSm";
import WidgetLg from "../../components/admin/WidgetLg";
import styled from "styled-components";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 4;
`;

const HomeWidgets = styled.div`
  display: flex;
  margin: 20px;
`;

export default function Home() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await axios.get("http://localhost:5000/api/orders");

        const monthlyData = {};
        ordersRes.data.forEach((order) => {
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
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Topbar />
      <Container>
        <Sidebar />
        <MainContent>
          <FeaturedInfo />
          <Chart data={orderData} title="Ventas por Mes" grid dataKey="amount" />
          <HomeWidgets>
            <WidgetSm />
            <WidgetLg />
          </HomeWidgets>
        </MainContent>
      </Container>
    </div>
  );
}