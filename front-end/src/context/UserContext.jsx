import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto de usuario
const UserContext = createContext();

// Proveedor de contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]); // Estado para los errores
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Función para registrar al usuario
  const register = async (firstName, secondName, email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, secondName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setErrors([]); // Limpiar errores
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
      } else {
        setErrors([data.message || "Hubo un problema con el registro"]);
      }
    } catch (err) {
      setErrors(["Hubo un problema con el registro"]);
    }
  };

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setErrors([]); // Limpiar errores
        return true
      } else {
        setErrors([data.message || "Error al iniciar sesión"]);
        return false
      }
    } catch (err) {
      setErrors([err.message || "Hubo un problema con el inicio de sesión"]);
      return false
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Función para actualizar el usuario
  const updateUser = async (firstName, secondName, email) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, secondName, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setErrors([]);
        return true
      } else {
        setErrors([data.message || "Error al actualizar el usuario"]);
        return false;
      }
    } catch (err) {
      setErrors([err.message || "Hubo un problema al actualizar el usuario"]);
      return false;
    }
  };

  // Función para eliminar el usuario
  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/user/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setErrors([]);
      } else {
        setErrors([data.message || "Error al eliminar el usuario"]);
      }
    } catch (err) {
      setErrors([err.message || "Hubo un problema al eliminar el usuario"]);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setErrors,
        errors,
        register,
        login,
        logout,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook para acceder al contexto
export const useUser = () => useContext(UserContext);
