import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Header from "./components/header/Header.jsx";
import App from "./App.jsx";
import Footer from "./components/footer/Footer.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(

  <BrowserRouter>
    <Provider store={store}>
      <UserProvider>
        <Header />
        <App />
        <Footer />
      </UserProvider>
    </Provider>
  </BrowserRouter>
);
