import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaPinterest,
  FaHome,
  FaMailBulk,
  FaTwitter,
} from "react-icons/fa";

import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  
`;

const ListItem = styled(Link)`
  width: 50%;
  margin-bottom: 10px;

  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Lincestore.</Logo>
        <Desc>
            Esta tienda surgio gracias a un proyecto de la materia topicos especializados de programacion web.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FaFacebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <FaInstagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <FaPinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Paginas</Title>
        <List>
          <ListItem to="/">Home</ListItem>
          <ListItem to="/cart">Carrito</ListItem>
          <ListItem to="/products/0">Productos</ListItem>
          <ListItem to="/register">Registrarse</ListItem>
          <ListItem to="/login">Iniciar sesion</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contactanos</Title>
        <ContactItem>
          <FaHome style={{marginRight:"10px"}}/> En el tecno
        </ContactItem>
        <ContactItem>
          <FaPhone style={{marginRight:"10px"}}/> +52 461 258 74252
        </ContactItem>
        <ContactItem>
          <FaMailBulk style={{marginRight:"10px"}} /> tecnoequipoweb@itcelaya.edu.mx
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
