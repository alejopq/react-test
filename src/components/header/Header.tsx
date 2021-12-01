import { FC } from "react";
import "./Header.scss";

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return <header className="Header sticky top-0">{title}</header>;
};

export default Header;
