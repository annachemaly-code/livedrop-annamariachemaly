// src/stories/ProductCard.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "../../components/molecules/ProductCard";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof ProductCard> = {
  title: "Molecules/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    id: "1",
    title: "Sample Product",
    price: 29.99,
    image: "https://via.placeholder.com/150",
    stockQty: 10,
    onAddToCart: () => alert("Added to cart!"),
  },
};

export const OutOfStock: Story = {
  args: {
    id: "2",
    title: "Out of Stock Product",
    price: 19.99,
    image: "https://via.placeholder.com/150",
    stockQty: 0,
    onAddToCart: () => alert("This should not happen!"),
  },
};
