import {
  FaSearch, 
  FaShoppingCart
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getToken } from "../../authUtils";
import axios from "axios";
import { useEffect, useState } from "react";
import { ip } from '../../constants.js';
import { useNavigate } from 'react-router-dom';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

const Product = ({ item }) => {
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  const token = getToken();

  const [cart, setCart] = useState([]);
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://${ip}:5000/api/carts/${id}`, { headers });
        setCart(response.data);
        
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [id]);

  
  const AddCart = async () => {
    try {
      const updatedCart = { ...cart };
      const newProduct = {
        productId: item._id,
        quantity: 1,
      };
      updatedCart.products.push(newProduct);
      const response = await axios.put(
        `http://${ip}:5000/api/carts/${cart._id}`,
        updatedCart,
        { headers }
      );
      setCart(response.data);
      navigate("/cart");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };
  
  return (
    <Container>
      <Circle />
      <Image src={"https://firebasestorage.googleapis.com/v0/b/proyectotew-d69b0.appspot.com/o/products%2F"+item._id+"%2F1.jpg?alt=media"} />
      <Name>{item.name}</Name>
      <Info>
        <Icon onClick={AddCart}>
          
          <FaShoppingCart />
        </Icon>
        
        <Icon>
          <Link to={`/product/${item._id}`}>
            <FaSearch />
          </Link>
        </Icon>
      </Info>
    </Container>
  );

};

export default Product;
