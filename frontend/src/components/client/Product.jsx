import {
  FaHeart,
  FaSearch, 
  FaShoppingCart
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <Container>
      <Circle />
      <Image src={"https://firebasestorage.googleapis.com/v0/b/proyectotew-d69b0.appspot.com/o/products%2F"+item._id+"%2F1.jpg?alt=media"} />
      <Name>{item.name}</Name>
      <Info>
        <Icon>
          <FaShoppingCart />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
          <FaSearch />
          </Link>
        </Icon>
        <Icon>
          <FaHeart />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
