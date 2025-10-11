import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "./ProductCard";

describe("ProductCard", () => {
  it("renders correctly and responds to Add to Cart", () => {
    const mockAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard
          id="123"
          title="Test Product"
          price={19.99}
          image="https://via.placeholder.com/150"
          stockQty={5}
          onAddToCart={mockAddToCart}
        />
      </MemoryRouter>
    );

    // Check the product title
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    // Check the price
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    // Check the button
    const button = screen.getByText("Add to Cart");
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    // Click the button
    fireEvent.click(button);
    expect(mockAddToCart).toHaveBeenCalled();
  });

  it("displays out of stock and disables button", () => {
    const mockAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard
          id="124"
          title="Out of Stock Product"
          price={9.99}
          image="https://via.placeholder.com/150"
          stockQty={0}
          onAddToCart={mockAddToCart}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Out of stock")).toBeInTheDocument();
    const button = screen.getByText("Add to Cart");
    expect(button).toBeDisabled();
  });
});
