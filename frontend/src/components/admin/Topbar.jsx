import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
width: 100%;
height: 50px;
background-color: white;
position: sticky;
top: 0;
z-index: 999;
`;

const TopbarWrapper = styled.div`
height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.span`
font-weight: bold;
  font-size: 30px;
  color: darkblue;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

export default function Topbar() {
  return (
    <Container>
      <TopbarWrapper>
        <div>
          <StyledLink to="/admin">
          <Logo>Lincestore</Logo>
          </StyledLink>
        </div>
      </TopbarWrapper>
    </Container>
  );
}
