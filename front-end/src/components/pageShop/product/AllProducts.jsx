import "../product/products.css"
//redux
import { useDispatch } from "react-redux";
import { addItem } from "../../../features/cart/cartSlice";

/**
 * mostrar todos los productos
 */

export default function AllProducts({ products }) {
//logica redux para el boton dinamico
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="allproducts-layout">
      <div className="max-container">
        <div className="layout-products">
          <h2 className="text-title">
            Preparate para una nueva explosion de esperiencias en tu salud!
          </h2>
          <div className="grid-layout">
          {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="box-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="imagen-product"
                  />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart"
                  >
                    Agregar al carrito
                  </button>
                </div>
              ))
            ) : (
              <p>No hay productos disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
