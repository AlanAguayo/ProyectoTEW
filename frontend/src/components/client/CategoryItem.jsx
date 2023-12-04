import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item._id}`}>
      <Image src={"https://firebasestorage.googleapis.com/v0/b/proyectotew-d69b0.appspot.com/o/categories%2F"+item._id+".jpg?alt=media"} />
      <Info>
        <Title>{item.name}</Title>
        <Button>Comprar Ahora</Button>
      </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
