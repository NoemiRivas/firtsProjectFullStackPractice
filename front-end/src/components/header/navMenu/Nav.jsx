//node
import React from "react";
import { Link } from "react-router-dom";



export default function Nav({ open }) {


  return (
    <nav className={open ? "open" : ""}>
      <Link to="/" className="links">
        inicio
      </Link>
      <Link to="/tienda" className="links">
        Tienda
      </Link>
    </nav>
  );
}
