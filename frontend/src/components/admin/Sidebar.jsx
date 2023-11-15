import {
  FaListAlt,
  FaTimeline,
  FaChartLine,
  FaIdCard,
  FaStore,
  FaMoneyBillAlt,
  FaChartBar,
  FaEnvelope,
  FaRss,
  FaCommentAltOutline,
  FaBriefcase,
  FaFlag,
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

export default function Sidebar() {
  return (
    <Container>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarList>
            <Link to="/" className="link">
            <SidebarListItem>
            <FaListAlt style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Home
            </SidebarListItem>
            </Link>
            <SidebarListItem>
              <FaTimeline style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Analytics
            </SidebarListItem>
            <SidebarListItem>
              <FaChartLine style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Sales
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Quick Menu</SidebarTitle>
          <SidebarList>
            <Link to="/users">
              <SidebarListItem>
                <FaIdCard style={{ marginRight: '5px', fontSize: '20px !important' }} />
                Users
              </SidebarListItem>
            </Link>
            <Link to="/products">
              <SidebarListItem>
                <FaStore style={{ marginRight: '5px', fontSize: '20px !important' }} />
                Products
              </SidebarListItem>
            </Link>
            <SidebarListItem>
              <FaMoneyBillAlt style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Transactions
            </SidebarListItem>
            <SidebarListItem>
              <FaChartBar style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Notifications</SidebarTitle>
          <SidebarList>
            <SidebarListItem>
              <FaEnvelope style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Mail
            </SidebarListItem>
            <SidebarListItem>
              <FaRss style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Feedback
            </SidebarListItem>
            <SidebarListItem>
              <FaCommentAltOutline style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Messages
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Staff</SidebarTitle>
          <SidebarList>
            <SidebarListItem>
              <FaBriefcase style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Manage
            </SidebarListItem>
            <SidebarListItem>
              <FaTimeline style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Analytics
            </SidebarListItem>
            <SidebarListItem>
              <FaFlag style={{ marginRight: '5px', fontSize: '20px !important' }} />
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </Container>
  );
}
