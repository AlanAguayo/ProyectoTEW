import { FaEye } from 'react-icons/fa';
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
  margin-right: 20px;
`;

const WidgetSmTitle = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const WidgetSmImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const WidgetSmList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const WidgetSmListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
`;

const WidgetSmUser = styled.div`
  display: flex;
  flex-direction: column;
`;

const WidgetSmUsername = styled.span`
  font-weight: 600;
`;

const WidgetSmButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none; // Añade esto para quitar la subrayado del enlace
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;
`;

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <WidgetSmTitle>Nuevos usuarios</WidgetSmTitle>
      <WidgetSmList>
        {users.map((user) => (
          <WidgetSmListItem key={user._id}>
            <WidgetSmImg
              src={
"https://firebasestorage.googleapis.com/v0/b/proyectotew-d69b0.appspot.com/o/users%2F"+user._id+".jpg?alt=media"              }
              alt=""
            />
            <WidgetSmUser>
              <WidgetSmUsername>{user.email}</WidgetSmUsername>
            </WidgetSmUser>
            <WidgetSmButton to={`/admin/users/${user._id}`}>
              <FaEye style={{ marginRight: 5 }} />
              Ver
            </WidgetSmButton>
          </WidgetSmListItem>
        ))}
      </WidgetSmList>
    </Container>
  );
}
