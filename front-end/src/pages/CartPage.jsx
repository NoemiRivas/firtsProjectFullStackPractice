import "./css/cartpage.css";
//node
import React from "react";
import { Link } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  increaseItem,
  removeItemsById,
} from "../features/cart/cartSlice";
//icons
import { MdOutlineCancel } from "react-icons/md";

export default function CartPage() {

  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleRemoveItemsById = (id) => {
    dispatch(removeItemsById(id));
  };

  const handleIncriseItem = (id) => {
    dispatch(increaseItem(id));
  };
  return (
    <main>
      {totalQuantity === 0 ? ( //------si el carrito es 0 "el carrito esta vacio"
        <div className="not-products">
          <div className="flex-title">
            <h2>Tus Productos</h2>
            <Link to={"/tienda"} className="link-top">
              continuar viendo
            </Link>
          </div>

          <div className="flex-empy">
            <p> El carrito esta vacio</p>
            <Link to={"/tienda"} className="link">
              regresar a la tienda
            </Link>
          </div>
        </div>
      ) : (
        //---si el carrito no esta vacio muestra el total con sus funcionalidades
        <div className="conteiner-cart">
          <div className="div-total-top">
            <h2>Tus Productos</h2>
            <div className="subtotal">
              
              subtotal <p>${Math.round(totalAmount * 100) / 100}</p>
            </div>
            <button className="pay">pagar</button>
          </div>
          {items.map((item) => (
            <div key={item._id} className="box-items-cart">
              <img src={item.image} alt={item.name} />

              <div className="list-items">
                <div className="box-info">
                  <h3> {item.name} </h3>
                  <p>
                    precio: <span>${item.price} </span>
                  </p>
                </div>
                <div className="quantity-box">
                  <h4>cantidad</h4>
                  <button onClick={() => handleRemoveItem(item._id)}>-</button>
                  <div>{item.quantity}</div>
                  <button onClick={() => handleIncriseItem(item._id)}>+</button>
                </div>
                <div>
                  <div>
                    ${Math.round(item.price * item.quantity * 100) / 100}
                  </div>
                </div>
                <div onClick={() => handleRemoveItemsById(item._id)}>
                  <MdOutlineCancel width={50} height={50} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
