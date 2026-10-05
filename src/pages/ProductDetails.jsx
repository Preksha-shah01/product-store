import { useParams, Link } from "react-router-dom";
import products from "../data/products";

function ProductDetails({ onAddToCart }) {

  const { id } = useParams();

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>

        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details">

      <img
        src={product.image}
        alt={product.name}
      />

      <div>

        <h1>{product.name}</h1>

        <p>
          Category: {product.category}
        </p>

        <h2>
          ₹{product.price.toLocaleString("en-IN")}
        </h2>

        <p>
          {product.description}
        </p>

        <p>
          Available Quantity: {product.quantity}
        </p>

        {product.quantity > 0 ? (

          <button
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>

        ) : (

          <p className="out-of-stock">
            Out of Stock
          </p>

        )}

      </div>

    </div>
  );
}

export default ProductDetails;