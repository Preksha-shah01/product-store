import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Products({ onAddToCart }) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Get unique categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  // Filter products
  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

  }, [search, category]);

  return (
    <div className="products-page">

      <h1>Products</h1>

      {/* Search Form */}

      <div className="filters">

        <div>
          <label>Search Products</label>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <label>Category</label>

          <select
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

      </div>

      {/* Product List */}

      <div className="product-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))

        ) : (

          <p className="no-products">
            No products found.
          </p>

        )}

      </div>

    </div>
  );
}

export default Products;