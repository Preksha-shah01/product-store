import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

import "./App.css";

function App() {

  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {

    setCart((previousCart) => {

      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {

        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + 1
              }
            : item
        );

      }

      return [
        ...previousCart,
        {
          ...product,
          cartQuantity: 1
        }
      ];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              cartQuantity: item.cartQuantity + 1
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {

    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cartQuantity: item.cartQuantity - 1
              }
            : item
        )
        .filter((item) => item.cartQuantity > 0)
    );
  };

  // Remove product
  const removeFromCart = (id) => {

    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== id
      )
    );
  };

  // Calculate total number of products
  const cartCount = cart.reduce(
    (total, item) =>
      total + item.cartQuantity,
    0
  );

  return (
    <BrowserRouter>

      <Navbar cartCount={cartCount} />

      <main>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={
              <Products
                onAddToCart={addToCart}
              />
            }
          />

          <Route
            path="/products/:id"
            element={
              <ProductDetails
                onAddToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            }
          />

        </Routes>

      </main>

    </BrowserRouter>
  );
}

export default App;