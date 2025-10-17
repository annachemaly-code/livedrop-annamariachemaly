import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../lib/store";
import { Button } from "../components/atoms/Button";
import { Heading } from "../components/atoms/Heading";
import { SearchBar } from "../components/molecules/SearchBar";
import { SortFilterControls } from "../components/molecules/SortFilterControls";
import { ProductCard } from "../components/molecules/ProductCard";
import { listProducts } from "../lib/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  tags: string[];
  category: string;
  stock?: number;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterTag, setFilterTag] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    listProducts()
      .then((data) => setProducts(data as Product[])) 
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  // Filtered products by search and selected category
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filterTag ? p.category === filterTag : true))
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  // Get all categories from products
  const allCategories = Array.from(new Set(products.map((p) => p.category)));

  const handleAddToCart = (product: Product) => {
    addItem(
      {
        id: product._id,
        title: product.name,
        price: product.price,
        image: `/products/${product._id}.jpg`,
      },
      1
    );

    setToastMessage(`${product.name} added to cart!`);
    setTimeout(() => setToastMessage(""), 2000);
  };

  return (
    <div className="p-6 relative">
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center mb-6">
        <Heading level={1}>Product Catalog</Heading>
        <Button
          className="bg-gray-600 hover:bg-gray-700"
          onClick={() => navigate("/cart")}
        >
          Go to Cart
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <SearchBar query={search} setQuery={setSearch} />
        <SortFilterControls
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          filterTag={filterTag}
          onFilterChange={setFilterTag}
          allTags={allCategories} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.name}
            price={product.price}
            image={`/products/${product._id}.jpg`}
            stockQty={product.stock}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
