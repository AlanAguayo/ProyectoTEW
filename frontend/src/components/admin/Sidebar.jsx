import {
  FaListAlt,
  FaIdCard,
  FaStore,
  FaMoneyBillAlt,
  FaShoppingBag,
} from 'react-icons/fa';

import { Link } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
flex: 1;
height: calc(100vh - 50px);
background-color: rgb(251, 251, 255);
position: sticky;
top: 50px;
`;

const SidebarWrapper = styled.div`
padding: 20px;
  color: #555;
`;

const SidebarMenu = styled.div`
margin-bottom: 10px;
`;

const SidebarTitle = styled.h3`
font-size: 13px;
  color: rgb(187, 186, 186);
`;

const SidebarList = styled.ul`
list-style: none;
  padding: 5px;
`;

const SidebarListItem = styled.div`
padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;

  &:hover,
  &.active {
    background-color: rgb(240, 240, 255);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: red;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

export default function Sidebar() {
  const handleLogout = () => {
    window.location.href = "/logout";
  };

  return (
    <Container>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>Menu</SidebarTitle>
          <SidebarList>
             <StyledLink to="/admin">
            <SidebarListItem>
            <FaListAlt style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Home
            </SidebarListItem>
            </StyledLink>
            <StyledLink to="/admin/users">
              <SidebarListItem>
                <FaIdCard style={{ marginRight: '5px', fontSize: '20px !important' }} />
                Usuarios
              </SidebarListItem>
            </StyledLink>
            <StyledLink to="/admin/products">
              <SidebarListItem>
                <FaStore style={{ marginRight: '5px', fontSize: '20px !important' }} />
                Productos
              </SidebarListItem>
            </StyledLink>
            <StyledLink to="/admin/orders">
            <SidebarListItem>
              <FaListAlt style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Ordenes
            </SidebarListItem>
            </StyledLink>
            <StyledLink to="/admin/categories">
            <SidebarListItem>
              <FaShoppingBag style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Categorias
            </SidebarListItem>
            </StyledLink>
            <StyledLink to="/admin/coupons">
            <SidebarListItem>
              <FaMoneyBillAlt style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Cupones
            </SidebarListItem>
            </StyledLink>
          </SidebarList>
        </SidebarMenu>
        <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
      </SidebarWrapper>
    </Container>
  );
}
