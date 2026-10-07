import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";

function Products({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Get unique categories
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  // Search + category filtering + sorting
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }

      if (sortBy === "price-high") {
        return b.price - a.price;
      }

      if (sortBy === "name-az") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "name-za") {
        return b.name.localeCompare(a.name);
      }

      return 0;
    });

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Find the perfect product for your needs.</p>
      </div>

      {/* Search and Filters */}
      <div className="filters">
        {/* Search */}
        <div className="filter-group search-group">
          <label htmlFor="search">Search Products</label>

          <input
            id="search"
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting */}
        <div className="filter-group">
          <label htmlFor="sortBy">Sort By</label>

          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name: A to Z</option>
            <option value="name-za">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Product Count */}
      <div className="results-info">
        <p>
          Showing <strong>{filteredProducts.length}</strong>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              {/* Product Image */}
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>

              {/* Product Information */}
              <div className="product-info">
                <span className="category">{product.category}</span>

                <h2>{product.name}</h2>

                <p className="price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>

                {/* Stock Status */}
                {product.quantity > 0 ? (
                  <p className="stock">
                    {product.quantity <= 5
                      ? `Only ${product.quantity} left`
                      : "✓ In Stock"}
                  </p>
                ) : (
                  <p className="out-of-stock">Out of Stock</p>
                )}

                {/* Buttons */}
                <div className="product-buttons">
                  <Link
                    to={`/products/${product.id}`}
                    className="details-btn"
                  >
                    View Details
                  </Link>

                  <button
                    className="add-btn"
                    onClick={() => onAddToCart(product)}
                    disabled={product.quantity === 0}
                  >
                    {product.quantity === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* No Products Found */
        <div className="no-products">
          <h2>No Products Found</h2>

          <p>
            We couldn't find any products matching your search or
            selected category.
          </p>

          <button
            className="reset-btn"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSortBy("default");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;