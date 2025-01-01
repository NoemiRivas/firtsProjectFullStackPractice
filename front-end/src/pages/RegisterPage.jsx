//css
import "./css/registerPage.css";
//node
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

//para mas facilidad paso cada informacion como un arreglo de objetos
const listItems = [
  {
    title: "Registrarse",
    nombre: "nombre",
    apellido: "apellido",
    email: "e-mail",
    password: "password",
    button: "enviar",
  },
];

export default function RegisterPage() {
  //traer desde context la funcionalidad de registro con los datos en la api y manejo de errores.
  const { register, errors, setErrors } = useUser();
  //variables de estado form
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //aceptar terminos
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Limpia errores anteriores
    setSuccessMessage(""); // Limpia mensajes de éxito anteriores

    if (!firstName || !secondName || !email || !password) {
      setErrors(["Por favor, completa todos los campos."]);
      return;
    }

    if (!termsAccepted) {
      setErrors(["Debes aceptar los términos y condiciones."]);
      return;
    }

    try {
      const userRegistered = await register(
        firstName,
        secondName,
        email,
        password
      );
      if (userRegistered) {
        setSuccessMessage("Usuario registrado correctamente. Redirigiendo...");
        setTimeout(() => {
          navigate("/login"); 
        }, 40000);
      }
    } catch (error) {
      setErrors(["Error al registrar el usuario."]);
    }
  };

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <section className="conteiner-register">
      {errors.length > 0 && <div className="errors">{errors[0]}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {listItems.map(
        ({ title, nombre, apellido, email, password, button }, key) => (
          <form className="form" key={key} onSubmit={handleSubmit}>
            <h2>{title} </h2>
            <input
              type="text"
              placeholder={nombre}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder={apellido}
              onChange={(e) => setSecondName(e.target.value)}
            />
            <input
              type="email"
              placeholder={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link to="/login" className="link">
              ¿ya tienes una cuenta? haz click aqui
            </Link>

            <div className="contend-check">
              <input
                type="checkbox"
                id="miCheckbox"
                name="miCheckbox"
                value="valor"
                checked={termsAccepted}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="miCheckbox" className="text">
                <p>Aceptar términos y condiciones</p>
              </label>
            </div>
            <button>{button} </button>
          </form>
        )
      )}
    </section>
  );
}
