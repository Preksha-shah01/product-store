import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <h1>Welcome to Product Store</h1>

      <p>
        Browse our products and add your favorite items
        to the shopping cart.
      </p>

      <Link to="/products" className="shop-btn">
        View Products
      </Link>

    </div>
  );
}

export default Home;