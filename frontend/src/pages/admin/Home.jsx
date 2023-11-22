import Chart from "../../components/Chart";
import FeaturedInfo from "../../components/admin/FeaturedInfo";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/admin/WidgetSm";
import WidgetLg from "../../components/admin/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import styled from "styled-components";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";

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
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch { }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div>
      <Topbar />
      <Container>
        <Sidebar />
        <MainContent>
          <FeaturedInfo />
          <Chart
            data={userData}
            title="Ventas"
            grid
            dataKey="Active User"
          />
          <HomeWidgets>
            <WidgetSm />
            <WidgetLg />
          </HomeWidgets>
        </MainContent>
      </Container>
    </div>
  );
}
