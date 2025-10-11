// src/pages/catalog.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../lib/store";
import { Button } from "../components/atoms/Button";
import { Heading } from "../components/atoms/Heading";
import { SearchBar } from "../components/molecules/SearchBar";
import { SortFilterControls } from "../components/molecules/SortFilterControls";
import { ProductCard } from "../components/molecules/ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  tags: string[];
  stockQty?: number;
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
    fetch("/mock-catalog.json")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filterTag ? p.tags.includes(filterTag) : true))
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  const allTags = Array.from(new Set(products.flatMap((p) => p.tags)));

  const handleAddToCart = (product: Product) => {
    addItem(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
      1
    );

    // Show toast message
    setToastMessage(`${product.title} added to cart!`);
    setTimeout(() => setToastMessage(""), 2000); // hide after 2 seconds
  };

  return (
    <div className="p-6 relative">
      {/* Toast message */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <Heading level={1}>Product Catalog</Heading>
        <Button
          className="bg-gray-600 hover:bg-gray-700"
          onClick={() => navigate("/cart")}
        >
          Go to Cart
        </Button>
      </div>

      {/* Search, Sort, Filter */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <SearchBar query={search} setQuery={setSearch} />
        <SortFilterControls
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          filterTag={filterTag}
          onFilterChange={setFilterTag}
          allTags={allTags}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            stockQty={product.stockQty}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
