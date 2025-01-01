import React from "react";
import { Link } from "react-router-dom";
//css
import "../footer/footer.css";
const listNav = [
  {
    title: "Información",
    items: ["Sobre Nosotros", "Política de Privacidad", "Términos de Servicio"],
  },
  { title: "Redes Sociales", items: ["Facebook", "Instagram", "Twitter"] },
];
export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <h2>
          <Link to="/" className="link">
            Fitness<span className="white-letter">T</span>ech{" "}
          </Link>
        </h2>

        <p>Tu tienda fitTecnológica para tu salud</p>
        <p>© todos los derechos reservados 2024</p>
      </div>
      {listNav.map(({ title, items }) => (
        <div className="nav-footer" key={title}>
          <h2 className="title">{title}</h2>
          {items.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      ))}
    </footer>
  );
}
