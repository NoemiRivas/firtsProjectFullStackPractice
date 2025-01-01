//css
import "./App.css";
//node
import { Route, Routes } from "react-router-dom";

//componentes
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import ShoppingPage from "./pages/ShoppingPage";
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/registro" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/carrito" element={<CartPage />}></Route>
        <Route path="/tienda" element={<ShoppingPage />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
