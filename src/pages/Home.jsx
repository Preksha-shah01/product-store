import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <h1>
        Everything You Need,
        <br />
        All in One Place.
      </h1>

      <p>
        Discover quality electronics, furniture and
        stationery at affordable prices.
      </p>

      <Link to="/products" className="shop-btn">
        Explore Products
      </Link>

    </div>
  );
}

export default Home;