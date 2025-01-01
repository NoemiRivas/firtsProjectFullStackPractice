import "../logout/button.css"
//node
import React from "react";
//context
import { useUser } from "../../context/UserContext"; 

const LogoutButton = () => {
  
    const context = useUser();
  
    const handleLogout = () => {
      if (context?.logout) {
        context.logout();
      } else {
        console.error("Logout function is undefined");
      }
    };
  
    return <button onClick={handleLogout} className="logout-button">Logout</button>;
  };

export default LogoutButton;