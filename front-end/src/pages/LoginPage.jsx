import React from "react";
//css
import "../pages/css/loginPage.css";
//node
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const listLogin = [
  {
    title: "accede a tu cuenta",
    email: "email",
    password: "password",
    submit: "enviar",
    forgotPassword: "Olvidaste la contraseña?",
    suscribe: "¿Aun no tienes una cuenta? suscribite aqui",
  },
];

export default function LoginPage() {
  const { login, errors, setErrors } = useUser();
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrors(["Por favor, completa todos los campos."]);
      return;
    }
    try {
      const loginUser=await login( email, password);
  
    setSuccessMessage("Usuario logeado correctamente. Redirigiendo a la pagina de inicio...");
           setTimeout(() => { 
             navigate("/"); 
           }, 4000);
  
          
       } catch (error) {
         setErrors(["Error al ingresar a la cuenta"]);
       }
     };

  return (
    <section className="login-container">
      {errors.length > 0 && <div className="errors">{errors[0]}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {listLogin.map(
        ({ title, password, submit, email, forgotPassword, suscribe }, key) => (
          <form className="login-page" key={key} onSubmit={handleSubmit}>
            <h2>{title} </h2>
            <input
              type="email"
              placeholder={email}
              className="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder={password}
              className="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>{forgotPassword} </p>
            <button className="enviar">{submit} </button>
            <div>
              <Link to="/registro" className="link-register">
                {suscribe}{" "}
              </Link>
            </div>
          </form>
        )
      )}
    </section>
  );
}
