import React, { useEffect, useState } from "react";
import "./items.css";
//redux
import { useDispatch } from "react-redux";
import { addItem } from "../../../features/cart/cartSlice";
//data api
import { getProducts } from "../../../api/api";

export default function Items() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        throw new Error("error al mostrar los productos");
      }
    };
    //llamada a la api para que muestre los productos
    fetchProducts();
  }, []);
  
  //redux logic para el botton 
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="products-container">
      <div className="max-container">
        <div className="layout-products">
          <h2 className="text-title">
            Preparate para una nueva explosion de esperiencias en tu salud!
          </h2>
          <div className="grid-layout">
            {products.slice(0, 4).map((product) => (
              <div key={product._id} className="box-conteiner">
                <img
                  src={product.image}
                  alt={product.name}
                  className="imagen-product"
                />
                <h3>{product.name} </h3>
                <p>${product.price} </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart"
                >
                  agregar el carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
