import "../header/header.css";
//node
import { React, useState } from "react";
import { Link } from "react-router-dom";
//icons
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
//redux
import { useSelector } from "react-redux";
import MenuButton from "./menuButton/menuButton";
import Nav from "./navMenu/Nav";
//context
import { useUser } from "../../context/UserContext"; 
//components
import LogoutButton from "../logout/LogoutButton";

export default function Header() {
  //variables carrito
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  //variables para la navegacion mobile
  const [openButton, setOpenButton] = useState(false);
  //context
  const { user, logout } = useUser();
  

  const handleClick = () => {
    setOpenButton(!openButton);
  };
  return (
    <header>
      <div className="header">
        <div className="logo">
          <Link to="/" className="logo">
            <h2>
              Fitness<span className="blue-letter">T</span>ech
            </h2>
          </Link>
        </div>
        <Nav open={openButton} />
        <div className="icons">
          <Link to="/carrito" className="links">
            <FaCartShopping size={30} />
            <div>{totalQuantity > 0 ? totalQuantity : 0}</div>
          </Link>
          {user ? ( 
            <div className="user-info">
             <span className="name">Hola, {user.firstName}</span>
              <FaUser size={30} />
              <LogoutButton onClick={logout} />
            </div>
          ) : (
            <Link to="/login" className="links">
              <FaUser size={30} />
            </Link>
          )}
         
        </div>
        <MenuButton
          openButton={openButton}
          handleClick={handleClick}
          className="menu-toggle"
        />
      </div>
    </header>
  );
}
