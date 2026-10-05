import { useMemo } from "react";
import CartItem from "../components/CartItem";

function Cart({
  cart,
  onIncrease,
  onDecrease,
  onRemove
}) {

  // Calculate total number of items
  const totalItems = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.cartQuantity,
      0
    );
  }, [cart]);


  // Calculate total price
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.cartQuantity,
      0
    );
  }, [cart]);


  return (
    <div className="cart-page">

      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (

        // Conditional rendering when cart is empty
        <div className="empty-cart">
          <h2>Your cart is empty.</h2>
          <p>Add some products to your cart.</p>
        </div>

      ) : (

        // Display cart when products are present
        <div className="cart-container">

          {/* Cart Items */}
          <div className="cart-items">

            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}

          </div>


          {/* Cart Summary */}
          <div className="cart-summary">

            <h2>Cart Summary</h2>

            <p>
              Items: {totalItems}
            </p>

            <h3>
              Total: ₹{totalPrice.toLocaleString("en-IN")}
            </h3>

            <button className="checkout-btn">
              Checkout
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;