import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../lib/store";
import { Button } from "../components/atoms/Button";
import { Heading } from "../components/atoms/Heading";
import { ProductCard } from "../components/molecules/ProductCard";
import { getProduct, listProducts } from "../lib/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  tags: string[];
  stock: number;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    getProduct(id)
      .then((data) => {
        if (!data) throw new Error("Product not found");
        setProduct(data);

        return listProducts().then((allProducts) => {
          // Exclude the current product
          let relatedProducts = allProducts.filter(p => p._id !== data._id);

          // First, get products with matching tags
          let matched = relatedProducts.filter(p =>
            p.tags.some(t => data.tags.includes(t))
          );

          // If less than 3, fill with other random products
          if (matched.length < 3) {
            const remaining = relatedProducts.filter(p => !matched.includes(p));
            while (matched.length < 3 && remaining.length > 0) {
              const randIndex = Math.floor(Math.random() * remaining.length);
              matched.push(remaining[randIndex]);
              remaining.splice(randIndex, 1);
            }
          }

          setRelated(matched.slice(0, 3)); // Limit to 3
        });
      })
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product)
    return <p className="p-6 text-center">Loading product details...</p>;

  const handleAddToCart = () => {
    if (product.stock === 0) return;

    addItem(
      {
        id: product._id,
        title: product.name,
        price: product.price,
        image: `/products/${product._id}.jpg`,
      },
      1
    );

    setProduct({ ...product, stock: product.stock - 1 });
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

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`/products/${product._id}.jpg`}
          alt={product.name}
          className="w-full max-w-md max-h-96 object-contain rounded-md"
        />
        <div className="flex flex-col gap-4">
          <Heading level={1}>{product.name}</Heading>
          <p className="text-xl text-gray-700 mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-2">
            Stock: {product.stock > 0 ? product.stock : "Out of stock"}
          </p>
          <div className="flex gap-4">
            <Button
              disabled={product.stock === 0}
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

      {related.length > 0 && (
        <div className="mt-10">
          <Heading level={2}>Related Products</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {related.map((r) => (
              <ProductCard
                key={r._id}
                id={r._id}
                title={r.name}
                price={r.price}
                image={`/products/${r._id}.jpg`}
                stockQty={r.stock}
                onAddToCart={() => {
                  if (r.stock === 0) return;
                  addItem(
                    {
                      id: r._id,
                      title: r.name,
                      price: r.price,
                      image: `/products/${r._id}.jpg`,
                    },
                    1
                  );
                  setToastMessage(`${r.name} added to cart!`);
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
