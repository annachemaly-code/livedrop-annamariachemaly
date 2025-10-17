// src/components/molecules/ProductCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  stockQty?: number;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  stockQty,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
      <Link to={`/p/${id}`} className="flex flex-col items-center">
        <img
          src={image}
          alt={title}
          className="w-full max-h-48 object-contain mb-2 rounded-md hover:scale-105 transition-transform"

        />
        <Heading level={3} className="mb-2 hover:text-gray-700">
          {title}
        </Heading>
      </Link>

      <p className="text-gray-600 mb-2">${price.toFixed(2)}</p>

      {stockQty !== undefined && stockQty === 0 && (
        <p className="text-red-500 mb-2">Out of stock</p>
      )}

      <Button
        className="bg-blue-600 hover:bg-blue-700"
        disabled={stockQty === 0}
        onClick={onAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};
