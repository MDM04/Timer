import styles from "styled-components";
import { Timer, Scroll } from "phosphor-react";
import logoIgnite from "../assets/logo-ignite.svg";
import { NavLink } from "react-router-dom";

const HeaderContainer = styles.header`
display: flex;
align-items: center;
justify-content: space-between;

nav {
  display: flex;
  gap: 0.5rem;

  a {
  
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme["gray-100"]};

  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;

  &:hover {
    border-bottom: 3px solid ${(props) => props.theme["green-500"]};
    }

    &.active {
      color: ${(props) => props.theme["green-500"]};
    }

  }
}
`;

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
