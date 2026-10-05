import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-info">

        <h2>{product.name}</h2>

        <p className="category">
          {product.category}
        </p>

        <p className="price">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <div className="product-buttons">

          <Link
            to={`/products/${product.id}`}
            className="details-btn"
          >
            View Details
          </Link>

          <button
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;