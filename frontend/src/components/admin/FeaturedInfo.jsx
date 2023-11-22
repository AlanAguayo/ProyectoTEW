import { FaArrowLeft , FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import styled from "styled-components";

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
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  return (
    <Featured>
      <FeaturedItem>
        <FeaturedTitle>Ganancias</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>${income[1]?.total}</FeaturedMoney>
          <FeaturedMoneyRate>
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <FaArrowLeft style={{fontSize: '14px', marginLeft: '5px', color: 'red'}}/>
            ) : (
              <FaArrowRight style={{ fontSize: '14px', marginLeft: '5px', color: 'green' }} />
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Comparado al mes pasado</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Ventas</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$0</FeaturedMoney>
          <FeaturedMoneyRate>
            -1.4 <FaArrowLeft style={{fontSize: '14px', marginLeft: '5px', color: 'red'}}/>
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Comparado al mes pasado</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Gastos</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$0</FeaturedMoney>
          <FeaturedMoneyRate>
            $0 <FaArrowRight style={{ fontSize: '14px', marginLeft: '5px', color: 'green' }} />
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Comparado por mes</FeaturedSub>
      </FeaturedItem>
    </Featured>
  );
}
