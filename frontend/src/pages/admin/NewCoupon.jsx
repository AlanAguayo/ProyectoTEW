import styled from "styled-components";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { checkAdmin, getToken } from "../../authUtils";
import { ip } from '../../constants.js';

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 4;
`;

const NewCouponForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const NewCouponItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;

const NewCouponItemLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;

const NewCouponItemInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const NewCouponButton = styled.button`
  width: 200px;
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
`;

const NewCoupon = () => {
  const navigate = useNavigate();

  const token = getToken();

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json', 
  };

  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    checkAdmin(navigate);
    if(id!=="new"){
    const fetchCouponData = async () => {
      try {
        const response = await axios.get(`http://${ip}:5000/api/coupons/${id}`,{headers});
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching coupon data:", error);
      }
    };

    if (id!=="new") {
      fetchCouponData();
    }
  }
  }, [id], [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateCoupon = async () => {
    try {
      if (id!=="new") {
        await axios.put(`http://${ip}:5000/api/coupons/${id}`, formData,{headers});
      } else {
        await axios.post(`http://${ip}:5000/api/coupons`, formData,{headers});
      }
      navigate("/admin/coupons");
    } catch (error) {
      console.error("Error al crear/editar categoría:", error);
    }
  };

  return (
    <div>
      <Topbar />
      <Container>
        <Sidebar />
        <MainContent>
          <h1>Cupon</h1>
          <NewCouponForm>
            <NewCouponItem>
              <NewCouponItemLabel>Codigo</NewCouponItemLabel>
              <NewCouponItemInput
                type="text"
                placeholder="LCSTOR"
                value={formData.code || ""}
                onChange={handleInputChange}
                name="code"
              />
            </NewCouponItem>
            <NewCouponItem>
              <NewCouponItemLabel>Descuento</NewCouponItemLabel>
              <NewCouponItemInput
                type="text"
                placeholder="0.5"
                value={formData.discount || ""}
                onChange={handleInputChange}
                name="discount"
              />
            </NewCouponItem>
          </NewCouponForm>
          <NewCouponButton className="newCouponButton" onClick={handleCreateCoupon}>
            Guardar
          </NewCouponButton>
        </MainContent>
      </Container>
    </div>
  );
};

export default NewCoupon;
