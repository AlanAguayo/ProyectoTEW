import {
  FaSearch,
  FaShoppingCart
} from "react-icons/fa";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
`;
const UserShowImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;
const Badge = styled.div`
  padding: 0 3px;
  background-color: blue;
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
  border-radius: 10px;
  position: relative;
  width: 0.5rem;
  top: -10px;
  right: -8px
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-right: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  var Name = localStorage.getItem("name");
  var img = localStorage.getItem('img');
  return (
    <Container>
      <Wrapper>
        <Left>       
          <SearchContainer>
            <Input placeholder="Buscar" />
            <FaSearch style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <StyledLink to="/">
          <Logo>Lincestore</Logo>
          </StyledLink>
        </Center>
        <Right>
          {Name?
          (
            <>
              
              <StyledLink to="/Profile">
                <MenuItem>{Name}</MenuItem>
              </StyledLink>
              <UserShowImg
                src={`${img}`}
                alt="Imagen del usuario"
              />
            </>
          )
          :
          (
            <>
              <StyledLink to="/register">
                <MenuItem>Registrarse</MenuItem>
              </StyledLink>
              <StyledLink to="/login">
                <MenuItem>Iniciar sesion</MenuItem>
              </StyledLink>
              <Link to="/cart">
                <MenuItem>
                  <div style={{ marginTop: '12px' }}>
                    <FaShoppingCart />
                    <Badge>{quantity === 0 ? "" : quantity}</Badge>
                  </div>
                </MenuItem>
              </Link>
            </>
          
          )
          }
          
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
