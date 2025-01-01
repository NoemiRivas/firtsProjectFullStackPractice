import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-conteiner">
      <div className="introduction-page">
        <h2>¡Comienza tu viaje fitness con nosotros hoy mismo!</h2>
        <p className="font-blackcontauner">

          Todo lo que necesitas para llevar tu entrenamiento al siguiente nivel
          encuentra tus productos favoritos y disfruta de una experiencia de
          compra fácil, rápida y segura.
        </p>
        <button> ver tecnologias</button>
        <span className="span">
          En la era digital actual la tecnología ha revolucionado todos los
          aspectos de nuestra vida y el mundo del fitness no es una excepción.
          <p className="fontsize-small">

            Los productos tecnológicos para fitness se han convertido en aliados
            esenciales para aquellos que buscan mejorar su salud, optimizar su
            rendimiento y alcanzar sus metas físicas de manera más eficiente.
          </p>
        </span>
      </div>
    </section>
  );
}
