import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        PRODUCT STORE
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;