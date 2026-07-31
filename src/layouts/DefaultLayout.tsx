import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import styles from "styled-components";

const LayoutContainer = styles.div`
max-width: 74rem;
height: calc(100vh - 10rem);
margin: 5rem auto;
padding: 2.5rem;


background: ${(props) => props.theme["gray-800"]};
border-radius: 8px;
display: flex;
flex-direction: column;

`;

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}
