// src/pages/product.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../../public/mock-catalog.json";
import { useCartStore } from "../lib/store";
import { Button } from "../components/atoms/Button";
import { Heading } from "../components/atoms/Heading";
import { ProductCard } from "../components/molecules/ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  tags: string[];
  stockQty: number;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const originalProduct = productsData.find((p) => p.id === id) as Product;
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [toastMessage, setToastMessage] = useState("");

  // Keep stock in component state
  const [product, setProduct] = useState<Product>(originalProduct);

  if (!product) return <p className="p-6 text-center">Product not found</p>;

  const handleAddToCart = () => {
    if (product.stockQty === 0) return;

    // Add to cart
    addItem(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
      1
    );

    // Decrement stock
    setProduct({ ...product, stockQty: product.stockQty - 1 });

    // Show toast
    setToastMessage(`${product.title} added to cart!`);
    setTimeout(() => setToastMessage(""), 2000);
  };

  // Related products (max 3)
  const related = productsData
    .filter(
      (p) => p.id !== product.id && p.tags.some((t) => product.tags.includes(t))
    )
    .slice(0, 3);

  return (
    <div className="p-6 relative">
      {/* Toast message */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      {/* Main Product */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-cover rounded-md"
        />
        <div className="flex flex-col gap-4">
          <Heading level={1}>{product.title}</Heading>
          <p className="text-xl text-gray-700 mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-2">
            Stock: {product.stockQty > 0 ? product.stockQty : "Out of stock"}
          </p>
          <div className="flex gap-4">
            <Button
              disabled={product.stockQty === 0}
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              className="bg-gray-600 hover:bg-gray-700"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-10">
          <Heading level={2}>Related Products</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {related.map((r) => (
              <ProductCard
                key={r.id}
                id={r.id}
                title={r.title}
                price={r.price}
                image={r.image}
                stockQty={r.stockQty}
                onAddToCart={() => {
                  if (r.stockQty === 0) return;

                  addItem(
                    {
                      id: r.id,
                      title: r.title,
                      price: r.price,
                      image: r.image,
                    },
                    1
                  );

            

                  setToastMessage(`${r.title} added to cart!`);
                  setTimeout(() => setToastMessage(""), 2000);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
